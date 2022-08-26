objects = [];
status="";
song="";
function preload()
{
song = loadSound("alarm.mp3");
}

function setup()
{
video = createCapture(VIDEO);
video.hide();
canvas = createCanvas(500,300);
canvas.center();
}

function modelLoaded()
{
console.log("Model is loaded");
status = true;
objectDetector.detect(video, gotResult);
}
function gotResult(error, results)
{
if(error)
{
console.error(error);
}
console.log(results);
objects=results;
}
function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status").innerHTML ="Status: Detecting Objects";
}
function draw()
{
image(video, 0,0,500,300)
if(status != "")
{
r=random(255);
g=random(255);
b=random(255);
for (i=0; i<objects.length;i++)
{
    document.getElementById("status").innerHTML ="Status: Objects Detected";
    noFill();
    stroke(r,g,b);
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    fill(r,g,b);
    percent = floor(objects[i].confidence*100);
    text(objects[i].label+" "+percent +"%",objects[i].x+15,objects[i].y+15);
    
    if(objects[i].label=="person")
{
    document.getElementById("object_length").innerHTML ="Baby is detected";
    song.stop();
}
else
{
    document.getElementById("object_length").innerHTML ="Baby is not detected";
    song.play();
}
}
}
}



