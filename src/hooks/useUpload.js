import { useState, useCallback } from 'react';
import { doc, setDoc, updateDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { analysisModel } from '../config/gemini';
import { geocode } from '../utils/geocoding';

/**
 * ID-Anchored Upload Hook
 * 
 * The critical pattern:
 * 1. Generate reportId BEFORE upload (the "ID Anchor")
 * 2. Create Firestore doc immediately with status "uploading"
 * 3. Upload image to Storage
 * 4. Process with Gemini AI (client-side since we're on free Spark plan)
 * 5. Update Firestore doc with results
 * 
 * The frontend can listen to this specific doc from step 2 onwards.
 */
export function useUpload() {
  const [uploadState, setUploadState] = useState({
    isUploading: false,
    reportId: null,
    status: null, // 'uploading' | 'processing' | 'pending' | 'failed'
    progress: 0,
    error: null
  });

  const resetUpload = useCallback(() => {
    setUploadState({
      isUploading: false,
      reportId: null,
      status: null,
      progress: 0,
      error: null
    });
  }, []);

  const uploadReport = useCallback(async (imageFile, reporterName = 'Anonymous') => {
    // Step 1: Generate the ID Anchor
    const reportId = doc(collection(db, 'reports')).id;
    
    setUploadState({
      isUploading: true,
      reportId,
      status: 'uploading',
      progress: 10,
      error: null
    });

    try {
      // Step 2: Create Firestore doc immediately
      await setDoc(doc(db, 'reports', reportId), {
        status: 'uploading',
        reportedBy: reporterName,
        timestamp: new Date(),
        imageUrl: '',
        extractedText: '',
        urgencyScore: 0,
        category: '',
        locationName: '',
        coordinates: null,
        summary: '',
        errorMessage: ''
      });

      setUploadState(prev => ({ ...prev, progress: 25 }));

      // Step 3: Upload image to Firebase Storage
      const storageRef = ref(storage, `reports/${reportId}/original.jpg`);
      await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(storageRef);

      // Update doc with image URL
      await updateDoc(doc(db, 'reports', reportId), {
        imageUrl,
        status: 'processing'
      });

      setUploadState(prev => ({ ...prev, status: 'processing', progress: 50 }));

      // Step 4: Process with Gemini AI (client-side)
      const base64Image = await fileToBase64(imageFile);
      const aiResult = await analyzeWithGemini(base64Image);

      setUploadState(prev => ({ ...prev, progress: 75 }));

      // Step 5: Geocode the extracted location
      let coordinates = null;
      if (aiResult.locationName) {
        const geo = await geocode(aiResult.locationName);
        coordinates = geo;
      }

      // Step 6: Update Firestore with AI results
      await updateDoc(doc(db, 'reports', reportId), {
        status: 'pending',
        extractedText: aiResult.extractedText || '',
        urgencyScore: aiResult.urgencyScore || 3,
        category: aiResult.category || 'Other',
        locationName: aiResult.locationName || 'Unknown',
        summary: aiResult.summary || '',
        coordinates,
        errorMessage: ''
      });

      setUploadState(prev => ({
        ...prev,
        status: 'pending',
        progress: 100
      }));

      return { success: true, reportId };

    } catch (err) {
      console.error('Upload/processing failed:', err);
      
      // Try to update the doc with error status
      try {
        await updateDoc(doc(db, 'reports', reportId), {
          status: 'failed',
          errorMessage: err.message || 'Processing failed'
        });
      } catch (updateErr) {
        console.error('Could not update error status:', updateErr);
      }

      setUploadState(prev => ({
        ...prev,
        status: 'failed',
        error: err.message || 'Upload failed. Please try again.',
        progress: 0
      }));

      return { success: false, error: err.message };
    }
  }, []);

  // Simulate upload for demo (when Firebase isn't configured)
  const simulateUpload = useCallback(async (imageFile, reporterName = 'Demo User') => {
    const reportId = `demo-${Date.now()}`;

    setUploadState({
      isUploading: true,
      reportId,
      status: 'uploading',
      progress: 10,
      error: null
    });

    // Simulate upload delay
    await delay(800);
    setUploadState(prev => ({ ...prev, progress: 30, status: 'processing' }));

    // Try real Gemini analysis if API key is configured
    let aiResult = null;
    try {
      const base64Image = await fileToBase64(imageFile);
      aiResult = await analyzeWithGemini(base64Image);
    } catch (err) {
      console.warn('Gemini analysis failed, using simulated data:', err.message);
    }

    await delay(1000);
    setUploadState(prev => ({ ...prev, progress: 70 }));

    await delay(600);

    const result = aiResult || {
      extractedText: 'Simulated: Heavy rain causing flooding on the main road. Water level rising. Need immediate help.',
      urgencyScore: 4,
      category: 'Flooding',
      locationName: '10th Main Road, Indiranagar',
      summary: 'Heavy flooding on main road, water level rising rapidly'
    };

    const coordinates = await geocode(result.locationName);

    setUploadState(prev => ({
      ...prev,
      status: 'pending',
      progress: 100
    }));

    return {
      success: true,
      reportId,
      report: {
        id: reportId,
        status: 'pending',
        imageUrl: URL.createObjectURL(imageFile),
        reportedBy: reporterName,
        timestamp: new Date(),
        coordinates,
        ...result
      }
    };
  }, []);

  return {
    uploadState,
    uploadReport,
    simulateUpload,
    resetUpload
  };
}

// --- Helper functions ---

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Remove the data:image/...;base64, prefix
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
  });
}

async function analyzeWithGemini(base64Image) {
  const prompt = `You are an emergency report analyzer for UpLift, a disaster response platform.

Analyze the handwritten report in this image and return a JSON object with:

{
  "extractedText": "The full text you can read from the image",
  "urgencyScore": <number 1-5>,
  "category": "<one of: Flooding, Building Collapse, Road Damage, Power Outage, Water Contamination, Fallen Tree, Gas Leak, Fire, Medical Emergency, Other>",
  "locationName": "the specific location mentioned in the report",
  "summary": "A one-sentence summary of the situation"
}

Urgency Rubric:
- 5: Life-threatening — people trapped, active danger, medical emergency
- 4: Severe infrastructure damage — building partially collapsed, major road blocked
- 3: Moderate damage — flooding without immediate danger, large debris
- 2: Minor damage — small road crack, minor water leak
- 1: Informational — cosmetic damage, observation, no action needed

Return ONLY valid JSON. No markdown, no explanation, no code fences.`;

  const result = await analysisModel.generateContent([
    prompt,
    {
      inlineData: {
        data: base64Image,
        mimeType: 'image/jpeg'
      }
    }
  ]);

  const text = result.response.text();
  
  try {
    return JSON.parse(text);
  } catch (e) {
    // Try to extract JSON from response if it has extra text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Failed to parse AI response as JSON');
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
