import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

export default function CheckRethult({ activeStep = 0 }) {
  return (
    <Stepper style={{margin : '30px'}} activeStep={activeStep} alternativeLabel>
      {['Login', 'Shipping Address', 'Paying', 'Place order'].map(step => (
        <Step key={step}>
          <StepLabel>{step} </StepLabel>{' '}
        </Step>
      ))}
    </Stepper>
  );
}
