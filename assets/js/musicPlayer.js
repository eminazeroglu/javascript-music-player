/* 
    Audio
    - Yuklendiyi anda datalari goturemek ucun loadedmetadata
        duration
    - Saniye gecdiyi muddeti goturmek ucun timeupdate
        currentTime
*/
class MusicPlayer {
    constructor(musicList, ui) {
        this.musicList = musicList;
        this.ui = ui;
        this.index = 0;
        this.played = false;

        this.start();
    }

    getMusic() {
        return this.musicList[this.index]
    }

    next() {
        if (this.index + 1 !== this.musicList.length) {
            this.index++;
        }
        else {
            this.index = 0
        }

        this.displayMusic();
        this.playAction();
        this.createPlayList();
    }

    previous() {
        if (this.index > 0) {
            this.index--
        }
        else {
            this.index = this.musicList.length - 1;
        }

        this.displayMusic();
        this.playAction();
        this.createPlayList();
    }

    displayMusic() {
        let music = this.getMusic();
        this.ui.musicPhoto.src = `/assets/img/${music.img}`;
        this.ui.name.innerText = music.name;
        this.ui.author.innerText = music.author;
        this.ui.audio.src = `/assets/mp3/${music.mp3}`
    }

    playAction() {
        if (this.played) {
            this.ui.audio.play();
        }
        else {
            this.ui.audio.pause();
        }
    }

    play(status = false) {

        if (status)
            this.played = true;
        else
            this.played = !this.played;

        if (!this.played)
            this.ui.btnPlay.querySelector('i').classList = 'fa-solid fa-play';
        else
            this.ui.btnPlay.querySelector('i').classList = 'fa-solid fa-pause';

        this.playAction();
    }

    changeMusic(index) {
        this.index = parseInt(index);
        this.displayMusic();
        this.createPlayList();
        this.play(true);
    }

    createPlayList() {
        const obj = this;
        let html = '';
        this.musicList.forEach((music, musicIndex) => {
            html += `
            <button data-index="${musicIndex}" class="btnChangeMusic flex py-2 first:pt-0 last:pb-0 items-center justify-between w-full ${this.index === musicIndex ? 'text-orange-300' : 'text-white'} text-xs hover:text-orange-300">
                <span>${music.author} - ${music.name}</span>
                <span>3:50</span>
            </button>
            `
        });
        this.ui.musicList.innerHTML = html;

        document.querySelectorAll('.btnChangeMusic').forEach(i => {
            i.addEventListener('click', () => {
                const index = i.getAttribute('data-index');
                obj.changeMusic(index)
            })
        });
    }

    calculateTime = (seconds) => {
        const minute = Math.floor(seconds / 60);
        const second = Math.floor(seconds % 60);
        return `${minute}:${second < 10 ? '0' + second : second}`
    }

    start() {
        this.ui.btnPlay.addEventListener('click', () => this.play());
        this.ui.btnNext.addEventListener('click', () => this.next());
        this.ui.btnPrev.addEventListener('click', () => this.previous());

        this.ui.audio.addEventListener('loadedmetadata', () => {
            this.ui.endTime.textContent = this.calculateTime(this.ui.audio.duration)
        })

        this.ui.audio.addEventListener('timeupdate', () => {
            this.ui.startTime.textContent = this.calculateTime(this.ui.audio.currentTime)
        })
    }
}