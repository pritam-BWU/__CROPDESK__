import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, accuracy_score
import joblib

# Load the dataset
def load_data():
    try:jh.
        data = pd.read_csv("fertilizer_data.csv")
        print("Columns in the dataset:", data.columns)
        return data
    except FileNotFoundError:
        print("Error: The CSV file 'fertilizer_data.csv' was not found.")
        return None
    except pd.errors.EmptyDataError:
        print("Error: The CSV file is empty.")
        return None
    except pd.errors.ParserError:
        print("Error: Unable to parse the CSV file. Please check the file format.")
        return None

# Preprocess the data
def preprocess_data(data):
    # Check for column name variations
    if 'temparature' in data.columns:
        data = data.rename(columns={'temparature': 'temperature'})
    
    if 'humidity ' in data.columns:  # Note the space after 'humidity'
        data = data.rename(columns={'humidity ': 'humidity'})

    # Convert categorical variables to numerical values
    data['soil_type'] = data['soil_type'].map({'Sandy': 0, 'Loamy': 1, 'Clayey': 2, 'Black': 3, 'Red': 4})
    data['crop_type'] = data['crop_type'].map({'Maize': 0, 'Sugarcane': 1, 'Cotton': 2, 'Tobacco': 3, 'Paddy': 4, 'Barley': 5})

    expected_columns = ['temperature', 'humidity', 'moisture', 'nitrogen', 'potassium', 'phosphorous', 'soil_type', 'crop_type']
    missing_columns = set(expected_columns) - set(data.columns)
    if missing_columns:
        raise ValueError(f"Missing columns in the dataset: {missing_columns}")

    X = data[expected_columns]
    y = data['fertilizer_name']

    return X, y

# Train the model
def train_model(X, y):
    # Split the data into train and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Create a pipeline with a scaler and a RandomForest classifier
    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('classifier', RandomForestClassifier(random_state=42))
    ])

    # Train the model
    pipeline.fit(X_train, y_train)

    # Evaluate the model
    y_pred = pipeline.predict(X_test)
    print("Model Accuracy:", accuracy_score(y_test, y_pred))
    print("\nClassification Report:\n", classification_report(y_test, y_pred))

    return pipeline

# Save the model to a file
def save_model(model, filename="fertilizer_recommendation_model.pkl"):
    joblib.dump(model, filename)
    print(f"Model saved to {filename}")

if __name__ == "__main__":
    # Load and preprocess the data
    data = load_data()
    if data is None:
        print("Exiting due to data loading error.")
        exit(1)
    
    try:
        X, y = preprocess_data(data)
    except ValueError as e:
        print(f"Error during preprocessing: {e}")
        exit(1)

    # Check if we have enough data to split
    if len(X) < 10:  # Arbitrary small number, adjust as needed
        print("Error: Not enough data to train the model.")
        exit(1)

    # Train the model
    model = train_model(X, y)

    # Save the trained model
    save_model(model)
    
