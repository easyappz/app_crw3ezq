import React, { useState } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [secondOperand, setSecondOperand] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else if (value === '.' && display.includes('.')) {
      return;
    } else {
      setDisplay(display + value);
    }

    if (waitingForSecondOperand) {
      setSecondOperand(parseFloat(display + value));
    }
  };

  const handleOperatorClick = (op) => {
    if (firstOperand === null) {
      setFirstOperand(parseFloat(display));
      setDisplay('0');
      setOperator(op);
      setWaitingForSecondOperand(true);
    } else if (waitingForSecondOperand) {
      setOperator(op);
    } else {
      calculateResult();
      setOperator(op);
      setWaitingForSecondOperand(true);
    }
  };

  const calculateResult = () => {
    if (firstOperand === null || operator === null) return;

    const second = secondOperand !== null ? secondOperand : parseFloat(display);
    let result = 0;

    if (operator === '+') {
      result = firstOperand + second;
    } else if (operator === '-') {
      result = firstOperand - second;
    } else if (operator === '*') {
      result = firstOperand * second;
    } else if (operator === '/') {
      if (second === 0) {
        setDisplay('Error');
        resetCalculator();
        return;
      }
      result = firstOperand / second;
    }

    setDisplay(result.toString());
    setFirstOperand(result);
    setSecondOperand(null);
    setWaitingForSecondOperand(false);
  };

  const resetCalculator = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setSecondOperand(null);
    setWaitingForSecondOperand(false);
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', 'C', '+',
    '='
  ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Paper elevation={6} sx={{ width: 320, padding: 2, backgroundColor: '#fff', borderRadius: 3 }}>
        <TextField
          variant="outlined"
          fullWidth
          value={display}
          disabled
          sx={{ marginBottom: 2, backgroundColor: '#e0e0e0', borderRadius: 1 }}
          inputProps={{ style: { textAlign: 'right', fontSize: '2rem' } }}
        />
        <Grid container spacing={1}>
          {buttons.map((btn) => (
            <Grid item xs={3} key={btn}>
              <Button
                variant={btn === '=' ? 'contained' : 'outlined'}
                color={['+', '-', '*', '/'].includes(btn) ? 'primary' : 'default'}
                fullWidth
                sx={{ height: 60, fontSize: '1.2rem', borderRadius: 1 }}
                onClick={() => {
                  if (btn === 'C') resetCalculator();
                  else if (btn === '=') calculateResult();
                  else if (['+', '-', '*', '/'].includes(btn)) handleOperatorClick(btn);
                  else handleNumberClick(btn);
                }}
              >
                {btn}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Typography variant="caption" align="center" sx={{ display: 'block', marginTop: 1, color: '#757575' }}>
          Simple Calculator
        </Typography>
      </Paper>
    </Box>
  );
};

export default Calculator;
