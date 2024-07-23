import { create } from 'zustand'
import { DraftPatient, Patient } from '../types'
import { v4 as uuid } from 'uuid'

type PatientState = {
  patients: Patient[]
  addPatient: (patient: DraftPatient) => void,
  deletePatient: (id: Patient['id']) => void
}

const createPatient = (patient: DraftPatient): Patient => {
  return { ...patient, id: uuid() }
}

export const usePatientStore = create<PatientState>((set) => ({
  patients: [],
  addPatient: (data) => {
    const newPatient = createPatient(data)
    set((state) => ({
      patients: [...state.patients, newPatient],
    }))
  },
  deletePatient: (id) => set((state) => ({ patients: state.patients.filter((p) => p.id !== id) })),
}))
