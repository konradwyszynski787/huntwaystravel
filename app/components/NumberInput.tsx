import { useState, useEffect } from 'react'
import styles from './TravelForm.module.css'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface NumberInputProps {
  value: string
  onChange: (value: string) => void
  min?: number
  max?: number
  className?: string
  placeholder?: string
  required?: boolean
}

export default function NumberInput({ 
  value, 
  onChange, 
  min = 0, 
  max = 999, 
  className = '',
  placeholder = '',
  required = false
}: NumberInputProps) {
  const [internalValue, setInternalValue] = useState(value)

  useEffect(() => {
    setInternalValue(value)
  }, [value])

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault()
    const currentValue = parseInt(internalValue) || 0
    if (currentValue < max) {
      const newValue = (currentValue + 1).toString()
      setInternalValue(newValue)
      onChange(newValue)
    }
  }

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault()
    const currentValue = parseInt(internalValue) || 0
    if (currentValue > min) {
      const newValue = (currentValue - 1).toString()
      setInternalValue(newValue)
      onChange(newValue)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInternalValue(newValue)
    
    // Validate on blur or when complete
    const numValue = parseInt(newValue)
    if (!isNaN(numValue)) {
      if (numValue >= min && numValue <= max) {
        onChange(newValue)
      } else if (numValue < min) {
        const minValue = min.toString()
        setInternalValue(minValue)
        onChange(minValue)
      } else if (numValue > max) {
        const maxValue = max.toString()
        setInternalValue(maxValue)
        onChange(maxValue)
      }
    } else if (newValue === '') {
      onChange(newValue)
    }
  }

  const handleBlur = () => {
    if (internalValue === '') {
      const defaultValue = min.toString()
      setInternalValue(defaultValue)
      onChange(defaultValue)
      return
    }
    
    const numValue = parseInt(internalValue)
    if (isNaN(numValue)) {
      const defaultValue = min.toString()
      setInternalValue(defaultValue)
      onChange(defaultValue)
    } else if (numValue < min) {
      setInternalValue(min.toString())
      onChange(min.toString())
    } else if (numValue > max) {
      setInternalValue(max.toString())
      onChange(max.toString())
    }
  }

  const currentValue = parseInt(internalValue) || 0
  const isMinDisabled = currentValue <= min
  const isMaxDisabled = currentValue >= max

  return (
    <div className={styles.numberInputWrapper}>
      <input
        type="number"
        value={internalValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        min={min}
        max={max}
        className={`${styles.numberInput} ${className}`}
        placeholder={placeholder}
        required={required}
      />
      <div className={styles.numberInputArrows}>
        <button
          type="button"
          className={`${styles.numberInputArrow} ${styles.up}`}
          onClick={handleIncrement}
          disabled={isMaxDisabled}
          aria-label="Zwiększ wartość"
        >
          <ChevronUp size={14} />
        </button>
        <button
          type="button"
          className={`${styles.numberInputArrow} ${styles.down}`}
          onClick={handleDecrement}
          disabled={isMinDisabled}
          aria-label="Zmniejsz wartość"
        >
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  )
}