import numpy as np
import tensorflow as tf
from tensorflow import keras

def load_model_and_class_names(model_path, validation_set):
    model = tf.keras.models.load_model(model_path)
    class_names = validation_set.class_names
    return model, class_names

def predict_disease(model, class_names, image_path):
    image = tf.keras.preprocessing.image.load_img(image_path, target_size=(128, 128))
    input_arr = tf.keras.preprocessing.image.img_to_array(image)
    input_arr = np.array([input_arr])  # Convert single image to a batch.
    predictions = model.predict(input_arr)
    result_index = np.argmax(predictions)  # Return index of max element
    model_prediction = class_names[result_index]
    return model_prediction

def predict_disease_from_image(image_path):
    validation_set = tf.keras.utils.image_dataset_from_directory(
        'valid',
        labels="inferred",
        label_mode="categorical",
        class_names=None,
        color_mode="rgb",
        batch_size=32,
        image_size=(128, 128),
        shuffle=True,
        seed=None,
        validation_split=None,
        subset=None,
        interpolation="bilinear",
        follow_links=False,
        crop_to_aspect_ratio=False
    )
    
    cnn, class_name = load_model_and_class_names('trained_plant_disease_model.h5', validation_set)
    model_prediction = predict_disease(cnn, class_name, image_path)
    return model_prediction

