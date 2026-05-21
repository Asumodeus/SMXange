/**
 * Global Translation Script
 * 
 * Instructions:
 * 1. Add id="language-picker" to your <select> language selector.
 * 2. Ensure the <option> values match the database columns (e.g., "cat", "esp", "eng").
 * 3. Add data-db-id="your_id" to elements that need translation.
 */

let currentAppliedLanguage: string | null = null;

// @ts-ignore
window.translatePage = async function(force: boolean = false): Promise<void> {
    const languagePicker = document.getElementById('languagePicker') as HTMLSelectElement | null;
    if (!languagePicker) {
        console.warn('Translation System: Language picker with id="language-picker" not found.');
        return;
    }

    const targetLang = languagePicker.value;

    if (!force && targetLang === currentAppliedLanguage) {
        return;
    }

    const elementsToTranslate = Array.from(document.querySelectorAll('[data-db-id]')) as HTMLElement[];
    
    // Extract unique translation IDs
    const translationIds = Array.from(
        new Set(elementsToTranslate.map(el => el.getAttribute('data-db-id')).filter(Boolean) as string[])
    );

    if (translationIds.length === 0) {
        return;
    }

    try {
        const response = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: translationIds, targetLang })
        });

        if (!response.ok) {
            throw new Error(`API returned status: ${response.status}`);
        }

        const dictionary = await response.json() as Record<string, string>;
        
        // Apply translations
        for (const element of elementsToTranslate) {
            const translationId = element.getAttribute('data-db-id');
            if (!translationId || !dictionary[translationId]) {
                continue;
            }

            const translatedText = dictionary[translationId];
            const tagName = element.tagName.toUpperCase();

            // Smart substitution logic based on element type
            if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
                (element as HTMLInputElement | HTMLTextAreaElement).placeholder = translatedText;
            } else if (tagName === 'IMG') {
                (element as HTMLImageElement).alt = translatedText;
            } else {
                element.textContent = translatedText;
            }
        }
        
        currentAppliedLanguage = targetLang;
        localStorage.setItem('selectedLanguage', targetLang);
    } catch (error) {
        console.error('Translation failed:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const languagePicker = document.getElementById('languagePicker') as HTMLSelectElement | null;
    
    if (languagePicker) {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            languagePicker.value = savedLanguage;
        }

        languagePicker.addEventListener('change', () => window.translatePage(false));
        window.translatePage(false); // Trigger initial translation
    }
});
