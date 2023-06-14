# Prescription Generator

A web app that takes in doctor’s notes, and generates an appropriate prescription. Here I’ve made use of open AI’s API to query the doctor’s diagnosis and retrieve the appropriate medicine name and dosage. This retrieved data is then used in the generated prescription.

I've used jsPdf to generate the pdf and the html2canvas package to convert the html containing the input prescription to an PNG format so that it can be added as an image in the generated pdf.

[Sample Prescription](https://drive.google.com/file/d/1V6SkjzHu9ElQLWalDJuu1PyFG3c0-EKY/view?usp=drivesdk)

## To run the project locally

## Clone the repo

### `git clone https://github.com/mihir224/prescription-generator`

## In the project directory, run

### `npm start`

To run the app in the development mode

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
