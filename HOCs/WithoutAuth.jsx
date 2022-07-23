import Loader from '../components/Loader'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context.js'
import { onAuth } from '../firebase/utils'

export function WithoutAuth(Component) {
    return () => {
        const { user, setUserProfile, setUserData } = useUser()

        useEffect(() => {
            onAuth(setUserProfile, setUserData)
        }, [user]);

        return (
            <>
                {user === undefined && <Loader />}
                 <Component {...arguments} />
            </>
        )
    }
}
