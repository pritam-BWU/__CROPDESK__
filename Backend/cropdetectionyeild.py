# crop_detection_yield.py
from flask import save_model
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import classification_report
from sklearn import metrics
from sklearn import tree
from sklearn.naive_bayes import GaussianNB
from sklearn.model_selection import train_test_split, cross_val_score
import pickle
import os

# Load the dataset
DATA_PATH = "Crop_recommendation.csv"  # Replace with the actual path
df = pd.read_csv(DATA_PATH)

# Explore the dataset
print(df.head())
print(df.tail())
print(df.size)
print(df.shape)
print(df.columns)
print(df['label'].unique())
print(df.describe())
print(df.dtypes)
print(df['label'].value_counts())

# Calculate correlation for numeric columns only
sns.heatmap(df.select_dtypes(include=['number']).corr(), annot=True)

# Split the dataset into features and target
features = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
target = df['label']

# Split the data into training and testing sets
Xtrain, Xtest, Ytrain, Ytest = train_test_split(features, target, test_size=0.2, random_state=2)

# Train a Naive Bayes classifier
NaiveBayes = GaussianNB()
NaiveBayes.fit(Xtrain, Ytrain)

# Evaluate the model
predicted_values = NaiveBayes.predict(Xtest)
accuracy = metrics.accuracy_score(Ytest, predicted_values)
print("Naive Bayes's Accuracy is: ", accuracy)
print(classification_report(Ytest, predicted_values))

# Cross-validation score
score = cross_val_score(NaiveBayes, features, target, cv=5)
print("Cross-validation score: ", score)

# Save the model to a pickle file
filename = 'naive_bayes_model.pkl'
pickle.dump(NaiveBayes, open(filename, 'wb'))
print(f"Model saved as {filename}")

# Load the saved model and make predictions
def predict_crop(N, P, K, temperature, humidity, ph, rainfall):
    loaded_model = pickle.load(open(filename, 'rb'))
    user_input = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
    prediction = loaded_model.predict(user_input)
    return prediction[0]

# Example usage
N = float(input("Enter Nitrogen content (N): "))
P = float(input("Enter Phosphorous content (P): "))
K = float(input("Enter Potassium content (K): "))
temperature = float(input("Enter temperature: "))
humidity = float(input("Enter humidity: "))
ph = float(input("Enter pH value: "))
rainfall = float(input("Enter rainfall: "))

predicted_crop = predict_crop(N, P, K, temperature, humidity, ph, rainfall)
print("The predicted crop is:", predicted_crop)

if __name__ == "__main__":
    # Load and preprocess the data
    data = df
    if data is None:
        print("Exiting due to data loading error.")
        exit(1)
    
    try:
        X, y = features, target
    except ValueError as e:
        print(f"Error during preprocessing: {e}")
        exit(1)

    # Check if we have enough data to split
    if len(X) < 10:  # Arbitrary small number, adjust as needed
        print("Error: Not enough data to train the model.")
        exit(1)

    # Train the model
    model = NaiveBayes

    # Save the trained model
    save_model(model, filename)