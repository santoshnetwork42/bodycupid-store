import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/router';


function awsAuthenticate({ signOut, user }) {
    const router = useRouter();
    if(user){
        router.push("/pages/account")
    }
  return (
    <>
        <h1>Hello {user.username}</h1>
        <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(awsAuthenticate);