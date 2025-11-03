import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Accueil from './pages/Accueil.jsx'
import DemandeObjet from './pages/DemandeObjet.jsx'
import ObjetsEnDouble from './pages/ObjetsEnDouble.jsx'
export default function App(){return (<Router><Layout><Routes><Route path='/' element={<Accueil/>}/><Route path='/demandes' element={<DemandeObjet/>}/><Route path='/objets' element={<ObjetsEnDouble/>}/><Route path='*' element={<Navigate to='/'/>}/></Routes></Layout></Router>)}
