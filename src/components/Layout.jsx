import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'
export default function Layout({ children }){
  const location = useLocation()
  const [user,setUser] = React.useState(null)
  React.useEffect(()=>{ supabase.auth.getUser().then(({data})=>{ if(data?.user) setUser(data.user) }); const { data:listener } = supabase.auth.onAuthStateChange((_, session) => { setUser(session?.user ?? null) }); return ()=> listener?.subscription?.unsubscribe?.() },[])
  const handleLogin = async ()=>{ await supabase.auth.signInWithOAuth({ provider: 'google' }) }
  const handleLogout = async ()=>{ await supabase.auth.signOut(); setUser(null) }
  return (
    <div className='min-h-screen bg-main relative text-gray-100 font-orbitron'>
      <div className='animated-bg absolute inset-0 -z-10'></div>
      <header className='w-full flex items-center justify-center relative py-6 border-b border-gray-800 bg-black/30 backdrop-blur-sm'>
        <div className='absolute left-6 top-5'>
          {user ? (<button onClick={handleLogout} className='conn-btn flex items-center gap-2'><img src='/google.png' alt='g' className='w-5 h-5'/> Se déconnecter</button>) : (<button onClick={handleLogin} className='conn-btn flex items-center gap-2'><img src='/google.png' alt='g' className='w-5 h-5'/> Connexion</button>)}
        </div>
        <img src='/logo.gif' alt='logo' className='w-28 h-28 object-contain' style={{position:'absolute', top:12, left:'50%', transform:'translateX(-50%)'}} />
        <nav className='absolute right-8 top-6 flex gap-4'>
          <Link to='/' className={'nav-btn ' + (location.pathname==='/'? 'active':'')}>Accueil</Link>
          <Link to='/demandes' className={'nav-btn ' + (location.pathname==='/demandes'? 'active':'')}>Demandes</Link>
          <Link to='/objets' className={'nav-btn ' + (location.pathname==='/objets'? 'active':'')}>Objets en double</Link>
        </nav>
      </header>
      <main className='p-8'>
        {children}
      </main>
    </div>
  )
}
