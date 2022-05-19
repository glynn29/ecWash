import React from "react";
import Compressor from "compressorjs";

const QUALITY = .65;
const PART_LENGTH = 512;
const CATEGORY_LENGTH = 128;

export const handleFileUpload = (uploadTask, setProgress) => {
    try {
        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed', (snapshot) => {
                              let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                              setProgress(progress);
                          },
                          (error) => {

                              reject(error.message);
                          },
                          () => {
                              uploadTask.snapshot.ref.getDownloadURL()
                                  .then((downloadURL) => {
                                      resolve(downloadURL);
                                  });
                          });
        });
    } catch (e) {
        return Promise.reject(e);
    }
};

export const compressFile = (image, isPart = true) => {
    let quality, width, height;

    if (isPart) {
        quality = QUALITY;
        width = PART_LENGTH;
        height = PART_LENGTH;
    } else {
        quality = QUALITY;
        width = CATEGORY_LENGTH;
        height = CATEGORY_LENGTH;
    }

    return new Promise((resolve, reject) => {
        new Compressor(image, {
            quality: quality,
            maxWidth: width,
            maxHeight: height,
            success: (compressedResult) => {
                resolve(compressedResult);
            },
            error(err) {
                reject(err.message);
            }
        });
    });
};
