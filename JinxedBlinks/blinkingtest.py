# Zoe Wells 
# Usage: copy code below into terminal
# python blinkingtest.py --shape-predictor shape_predictor_68_face_landmarks.dat --video blink_detection_demo.mp4

# import the necessary packages
from scipy.spatial import distance as dist
from imutils.video import FileVideoStream
from imutils.video import VideoStream
from imutils import face_utils
import numpy as np
import argparse
import imutils
import time
import dlib
import cv2

def eye_aspect_ratio(eye):
    # compute the euclidean distances between the two sets of
    # vertical eye landmarks (x, y)-coordinates
    A = dist.euclidean(eye[1], eye[5])
    B = dist.euclidean(eye[2], eye[4])

    # compute the euclidean distance between the horizontal
    # eye landmark (x, y)-coordinates
    C = dist.euclidean(eye[0], eye[3])

    # compute the eye aspect ratio
    ear = (A + B) / (2.0 * C)

    # return the eye aspect ratio
    return ear
 
#import images and put in list 
#img0 = cv2.imread('images/farmhouse00.png',1)
#img1 = cv2.imread('images/farmhouse01.png',1)
#img2 = cv2.imread('images/farmhouse02.png',1)
#img3 = cv2.imread('images/farmhouse03.png',1)
#img4 = cv2.imread('images/farmhouse04.png',1)
#img5 = cv2.imread('images/farmhouse05.png',1)
#img6 = cv2.imread('images/farmhouse06.png',1)
#img7 = cv2.imread('images/farmhouse07.png',1)

img0 = cv2.imread('images/redofarm0.png',1)
img1 = cv2.imread('images/redofarm1.png',1)
img2 = cv2.imread('images/redofarm2.png',1)
img3 = cv2.imread('images/redofarm3.png',1)
img4 = cv2.imread('images/redofarm4.png',1)
img5 = cv2.imread('images/redofarm5.png',1)
img6 = cv2.imread('images/redofarm6.png',1)
img7 = cv2.imread('images/redofarm7.png',1)


myImages = [img1,img2,img3,img4,img5,img6]

#start on first image, index one
thisImg = img0
index = 7;
isBlink = False

#import sound
#wave.open(gasp.wav, mode=rb)

# construct the argument parse and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-p", "--shape-predictor", required=True,
    help="path to facial landmark predictor")
ap.add_argument("-v", "--video", type=str, default="",
    help="path to input video file")
args = vars(ap.parse_args())
 
# define two constants, one for the eye aspect ratio to indicate
# blink and then a second constant for the number of consecutive
# frames the eye must be below the threshold
EYE_AR_THRESH = 0.27
EYE_AR_CONSEC_FRAMES = 1

# initialize the frame counters and the total number of blinks
OPENCOUNT = 0
COUNTER = 0
TOTAL = 0

# initialize dlib's face detector (HOG-based) and then create
# the facial landmark predictor
print("[INFO] loading facial landmark predictor...")
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(args["shape_predictor"])

# grab the indexes of the facial landmarks for the left and
# right eye, respectively
(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]

# start the video stream thread
print("[INFO] starting video stream thread...")
# vs = FileVideoStream(args["video"]).start()
# fileStream = True
vs = VideoStream(src=0).start()
# vs = VideoStream(usePiCamera=True).start()
fileStream = False
time.sleep(1.0)

# loop over frames from the video stream
while True:
    # if this is a file video stream, then we need to check if
    # there any more frames left in the buffer to process
    if fileStream and not vs.more():
        break
    # grab the frame from the threaded video file stream, resize
    # it, and convert it to grayscale
    # channels)
    frame = vs.read()
    frame = imutils.resize(frame, width=450)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # detect faces in the grayscale frame
    rects = detector(gray, 0)

    # loop over the face detections
    for rect in rects:
        # determine the facial landmarks for the face region, then
        # convert the facial landmark (x, y)-coordinates to a NumPy
        # array
        shape = predictor(gray, rect)
        shape = face_utils.shape_to_np(shape)

        # extract the left and right eye coordinates, then use the
        # coordinates to compute the eye aspect ratio for both eyes
        leftEye = shape[lStart:lEnd]
        rightEye = shape[rStart:rEnd]
        leftEAR = eye_aspect_ratio(leftEye)
        rightEAR = eye_aspect_ratio(rightEye)

        # average the eye aspect ratio together for both eyes
        ear = (leftEAR + rightEAR) / 2.0
        # print(ear)
        # compute the convex hull for the left and right eye, then
        # visualize each of the eyes
        leftEyeHull = cv2.convexHull(leftEye)
        rightEyeHull = cv2.convexHull(rightEye)
        cv2.drawContours(frame, [leftEyeHull], -1, (0, 255, 0), 1)
        cv2.drawContours(frame, [rightEyeHull], -1, (0, 255, 0), 1)

        # check to see if the eye aspect ratio is below the blink
        # threshold, and if so, increment the blink frame counter
        if ear < EYE_AR_THRESH:
            COUNTER += 1
            if COUNTER >= EYE_AR_CONSEC_FRAMES and isBlink == False and OPENCOUNT > 2:
                if index >= len(myImages)-1:
                    index = 0
                    thisImg = myImages[index]
                else:
                    index += 1
                    thisImg = myImages[index]
                OPENCOUNT = 0
                isBlink = True
                TOTAL += 1
                

        # otherwise, the eye aspect ratio is not below the blink
        # threshold
        else:
            OPENCOUNT += 1
            # reset the eye frame counter
            isBlink = False
            COUNTER = 0

        # draw the total number of blinks on the frame along with
        # the computed eye aspect ratio for the frame
        cv2.putText(frame, "Blinks: {}".format(TOTAL), (10, 30),
            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
        cv2.putText(frame, "EAR: {:.2f}".format(ear), (300, 30),
            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
 
    # show the frame
    cv2.imshow('window',thisImg)
    cv2.imshow("Frame", frame)
    key = cv2.waitKey(1) & 0xFF
 
    # if the `esc` key was pressed, break from the loop
    # if the 'r' key was pressed, reset to calibration screen
    # if the 'space' key was pressed, set EAR and start
    if key == 27:
        break
    elif key == 114:
        thisImg = img0
        index = 8
        EYE_AR_THRESH = 0.027
        print("RESET EAR: 0.025")
    elif key == 32:
        thisImg = img0
        index = 8
        EYE_AR_THRESH = ear - 0.045
        print("NEW EAR: " + str(EYE_AR_THRESH))


# do a bit of cleanup
cv2.destroyAllWindows()
vs.stop()