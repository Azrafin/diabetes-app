# Diabetes App

A web application for diabetes prediction using a machine learning model with a React frontend and a Flask backend.

> 🚧 This project is currently under development.

## Project Structure

```
diabetes-app/
├── backend/
│   ├── app.py
│   ├── diabetes_model.pkl
│   ├── scaler.pkl
│   └── requirements.txt
└── frontend/
    ├── src/
    ├── package.json
    └── ...
```

## Tech Stack

- React + Vite
- Tailwind CSS
- Flask
- Scikit-learn

## Project Structure

```text
diabetes-app/
├── backend/
└── frontend/
```

## Dataset

This project uses the **Pima Indians Diabetes Database**, originally provided by the National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK) and distributed through Kaggle. The dataset contains diagnostic measurements used to predict whether a patient has diabetes. :contentReference[oaicite:0]{index=0}

Dataset:
- https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database

## Model

The current prediction model is based on the following Kaggle notebook and is used as a baseline for application development:

- https://www.kaggle.com/code/shrutimechlearn/step-by-step-diabetes-classification/notebook


## Roadmap

- [ ] Build Flask API
- [ ] Connect React frontend
- [ ] Load trained model
- [ ] Display prediction results
- [ ] Add nutrition search feature
- [ ] Deploy application

## Acknowledgements

- Pima Indians Diabetes Database (Kaggle)
- Shruti Mechlearn – *Step by Step Diabetes Classification* notebook