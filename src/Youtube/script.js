// แสดง pop up เมื่อเมาส์ชี้ไปที่ชื่อช่อง
const channelNames = document.querySelectorAll('.channel-name');

channelNames.forEach(channel => {
    const videoDetails = channel.closest('.video-details'); 
    const popup = videoDetails.querySelector('.pop-up'); 

    popup.innerHTML = channel.textContent;

    channel.addEventListener('mouseenter', () => {
        popup.style.opacity = '1';
        popup.style.visibility = 'visible';
    });

    channel.addEventListener('mouseleave', () => {
        popup.style.opacity = '0';
        popup.style.visibility = 'hidden';
    });
});

// แทบแสดงวีดีโอจอเล็ก
const boxLine = document.querySelectorAll('.box-line');

for (let i = 0; i < boxLine.length; i++) {

    const videoBox = boxLine[i].closest('.video-box');
    const coverImg = videoBox.querySelector('.cover-img');
    const smallVdo = videoBox.querySelector('.small-video');

    boxLine[i].addEventListener('mouseenter', showPreview);
    boxLine[i].addEventListener('mouseleave', clearPreview);
    boxLine[i].addEventListener('mousemove', followMouse);
    
    function showPreview() {
        smallVdo.style.opacity = "1";
        coverImg.style.opacity = "0.5";
    }

    function clearPreview() {
        smallVdo.style.opacity = "0";
        coverImg.style.opacity = "1";
    }

    function followMouse(e) {
        const rect = coverImg.getBoundingClientRect(); // ตำแหน่ง cover-img
        const vdoWidth = smallVdo.offsetWidth;
        const padding = 4;

        let x = e.clientX - rect.left - vdoWidth / 2; 

        x = Math.max(padding, Math.min(x, rect.width - vdoWidth - padding));

        smallVdo.style.left = x + "px";
    }
};

// // แทบกลอวีดีโอ
const vdoBox = document.querySelectorAll('.video-box');

vdoBox.forEach(vdo => {
    const vdoLine = vdo.querySelector('.line');

    vdo.addEventListener('mouseenter', () => {
        vdoLine.style.opacity = "1";
    });

    vdo.addEventListener('mouseleave', () => {
        vdoLine.style.opacity = "0";
    });
});


let num = 5;

for (let i = 0; i < num; i++) {
    let text = "";

    for (let j = 0; j < num - i; j++) {
        text += "*";
    }
    console.log(text);
}
console.log("")

let count_j = num;

for (let i = 1; i <= num; i++) {
    let star = ""
    let space = ""

    for (let j = 1; j <= count_j; j++) {
        if (j <= num - i) {
            space += " ";
        } else {
            star += "*";
        }
    }
    count_j += 1;
    console.log(space + star);
}
console.log("");

let arr = [7, 4, 5, 9, 8, 2, 1, 1];

for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] > arr[j]) {
            let arr_i = arr[i];
            let arr_j = arr[j];

            arr[j] = arr_i;
            arr[i] = arr_j;
        }
    }
}
console.log(arr);