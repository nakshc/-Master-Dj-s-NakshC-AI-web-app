song = ""
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist= 0;

function preload() {

    song = loadSound("music.mp3")



}


function setup() {

    canvas = createCanvas(400, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();


    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)

}



function modelLoaded() {

    console.log("Model is Initialized")


}



function gotPoses(results) {

    if (results.length > 0) {

        console.log(results)
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX= " + leftWristX + "leftWristY= " + leftWristY);


        scoreLeftWrist= results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);


        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX= " + rightWristX + "rightWristY= " + rightWristY);

    }

}


function draw() {

    image(video, 0, 0, 400, 400)

    fill("#0d25ff")
    stroke("#ff0000")


    if (scoreLeftWrist > 0.2) {

    circle(leftWristX , leftWristY , 20)


    num=Number(leftWristY);

    remove_demicals= floor(num);


    volume= remove_decimals / 400;

    document.getElementById("volume").innerHTML= "Volume = "+ volume;
    song.setVolume(volume)
    console.log("Volume=" + volume)





    }

}

function play() {

    song.play();
    song.rate(2.5);
    song.setVolume(1);

}



function stop() {

    song.stop();


}