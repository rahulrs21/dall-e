// Meaning of utils, we can create new index.js file utility function or utils for short is a file where you 
// can create diffrent function which you can then reuse across your application

import { surpriseMePrompts } from '../constants'

import FileSaver from 'file-saver'

export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    // essentially we are getting random index from 1 - 49
    const randomPrompt = surpriseMePrompts[randomIndex];

    // Method that we should not get the randomPrompt again and again.
    if(randomPrompt === prompt) return getRandomPrompt(prompt);  // If we get same, then recall the function again

    return randomPrompt;
} 

// exporting this code to Card.jsx
export async function downloadImage (_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
}
