async function loadImageMetadata(category) {
    try {
        // Debug log
        console.log('Called loadImageMetadata for category:', category);
        
        const jsonPath = `./tutti_${category}.json`;
        console.log('Attempting to load JSON from:', jsonPath);
        
        const response = await fetch(jsonPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Successfully loaded JSON data:', data);
        
        return data[category] || []; // Return the array directly
        
    } catch (error) {
        console.error('Error in loadImageMetadata:', error);
        throw error; // Re-throw to handle in the calling function
    }
}

// Export the function
window.loadImageMetadata = loadImageMetadata;