document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('typewriter-text');
    textElement.textContent = ''; // Clear initial whitespace
    const message = `Mahal kong Maica,

Ipagpatawad mo kung ang aking liham na ito ay makakaabala sa iyo ng pansumandali.
Matagal ko nang binabalak na lumiham sa iyo subalit hindi ko alam pano sisimulan ang mga salitang nasa damdamamin ko.
Sa pamamagitan nito malalahathala ko na ang mga salitang gustong lumabas sa'kin.

Ang iyong pasensiya at pag-unawa sa sitwasyon na meron tayo ay sapat na para masabi kong ikaw ang gusto ko makasama sa lahat ng mga plano na ginawa ko.
Sa mundong tinatarantado ako andito ka para intindihin ako na kahit minsan ako'y hirap intindihin ang sarili ko. 

Lagi mong tatandaan na hindi ka kulang, hindi ka sapat lang, sobra ka. Salamat sa pagmamahal na binibigay mo sa akin. Mahal na mahal kita.

Nagmamahal,
Rodel Pogi.`;


    let index = 0;
    const speed = 50; // Typing speed in milliseconds
    const audio = new Audio('assets/freesound_community-035385_long-sound-typewriter-76388.mp3');
    audio.loop = true; // Loop the sound while typing

    function typeWriter() {
        if (index < message.length) {
            if (index === 0) {
                audio.play().catch(e => console.log("Audio play failed (user interaction needed):", e));
            }
            textElement.innerHTML += message.charAt(index) === '\n' ? '<br>' : message.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    }

    // Start typing after a small delay
    // Note: Audio might be blocked by browsers if verified without interaction. 
    // Usually requires a click, but we'll try auto-playing.

    // Updated: Require click to start to ensure audio plays
    // Updated: Require click to start to ensure audio plays
    // Updated: Require click to start to ensure audio plays
    const overlay = document.getElementById('start-overlay');
    const envelope = document.querySelector('.envelope');
    const bgMusic = document.getElementById('bg-music');
    const muteBtn = document.getElementById('mute-btn');

    if (overlay && envelope) {
        overlay.addEventListener('click', () => {
            envelope.classList.add('open');

            // Start playing background music
            if (bgMusic) {
                bgMusic.volume = 0.5; // Set initial volume
                bgMusic.play().catch(e => console.log("Audio play failed:", e));

                // Show mute button
                if (muteBtn) {
                    muteBtn.classList.remove('hidden');
                }
            }

            // Wait for envelope animation to finish before fading out
            setTimeout(() => {
                overlay.classList.add('hidden');

                // Wait for overlay fade out
                setTimeout(() => {
                    overlay.style.display = 'none';
                    typeWriter();
                }, 1000); // Matches CSS transition time
            }, 1500); // Wait for envelope open animation
        });
    } else if (overlay) {
        // Fallback if overlay is removed
        setTimeout(typeWriter, 1000);
    }

    if (muteBtn && bgMusic) {
        muteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling if overlay is still there (though it shouldn't be reachable)
            if (bgMusic.muted) {
                bgMusic.muted = false;
                muteBtn.textContent = 'ON';
                muteBtn.style.opacity = '1';
            } else {
                bgMusic.muted = true;
                muteBtn.textContent = 'OFF';
                muteBtn.style.opacity = '0.7';
            }
        });
    }
});
