import express from 'express';
import { PythonShell } from 'python-shell';

const router = express.Router({ mergeParams: true });

router.post("/symptoms", (req, res) => {

    let responseSent = false; // Flag to track if response has been sent
       
         const data = req.body.data;    
         console.log("My frontend data",data);
         

    let options = {
        mode: 'text',
        pythonPath: 'C:\\Users\\samee\\AppData\\Local\\Programs\\Python\\Python311\\python.exe',
        pythonOptions: ['-u'], // Get print results in real-time
        scriptPath: 'D:\\AI-MedLab-main\\AI-MedLab\\backend', // Directory of script
        args: data, 
    };

    PythonShell.run('symptoms.py', options)
        .then((messages) => {
            console.log('Final', JSON.parse(messages));
            res.status(200).json({ output: messages });
        })
        .catch((err) => {
            console.error('Error:', err);
            res.status(500).json({ error: err.message });
        });
});

export default router;





















// import { spawn } from 'child_process';


// const router = express.Router({ mergeParams: true });

// const pythonScriptPathForSymptoms = "D:\\AI-MedLab-main\\AI-MedLab\\backend\\symptoms.py";
// const symptomsModel = "D:\\AI-MedLab-main\\AI-MedLab\\backend\\ai-models\\svc.pkl";

// router.post("/symptoms", (req, res) => {
//   let responseSent = false; // Flag to track if response has been sent
//   try {
//     const data = req.body.data;

//     if (!Array.isArray(data)) {
//       console.log('Input should be like this - itching,skin_rash,cough')
//       return res.status(400).send('Invalid data format. Expected an array of symptoms.');
//   }

//     console.log("My frontend data",data);
//     //const newdata = { dataInString: JSON.stringify(data) };
//     //console.log({ dataInString: JSON.stringify(data) });
//     //console.log(newdata);
//     const symptomsJson = JSON.stringify(data); // Convert to JSON string
//     console.log(`Sending to Python: ${symptomsJson}`); 

//     const pythonProcess = spawn("python", [
//       pythonScriptPathForSymptoms,
//       "--loads",
//       symptomsModel,
//       symptomsJson//change {}->[]
//     ]);


//     let prediction;
//     pythonProcess.stdout.on("data", (data) => {
//       const dataString = data.toString();
//       console.log("helohelo")
//       console.log("Python script output===========: ", JSON.parse(dataString));
//       prediction = JSON.parse(dataString);
//     });

//     pythonProcess.stderr.on("data", (data) => {
//       console.error("Python script error:", data.toString());
//     });

//     pythonProcess.on("close", (code) => {
//       console.log("Python process closed with code:", code);
//       console.log("Prediction:", prediction);
//       if (!responseSent) {
//         res.json({ data: prediction });
//         responseSent = true;
//       }
//     });
//     pythonProcess.on("error", (error) => {
//       console.error("Python process error:", error);
//       if (!responseSent) {
//         res.status(500).send("Internal Server Error");
//         responseSent = true;
//       }
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     if (!responseSent) {
//       responseSent = true;
//       return res.status(500).send("Internal Server Error");
//     }
//   }
// });

//export default router;







