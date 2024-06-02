import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import { useState } from 'react'

export default function Input(type, label, LabelError) {
    const [input, setInput] = useState('')
    const handleInputChange = (e) => setInput(e.target.value)

  const isError = input === ''
  return (
    <FormControl isInvalid={isError}>
      <FormLabel>{label}</FormLabel>
      <Input type={type} value={input} onChange={handleInputChange} />
      {!isError ? (
        <FormHelperText>
          {label}
        </FormHelperText>
      ) : (
        <FormErrorMessage>{LabelError} is required.</FormErrorMessage>
      )}
    </FormControl>
  )
}
