import React from 'react';
import logo from "@/images/logo.png"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { Button } from './ui/button';

const SignInPrompt = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-12 pb-16 px-4 overflow-y-auto">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <Image
            src={logo}
            alt="logo"
            width={80}
            height={80}
            className="mb-4"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Bienvenue !
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-center">
            Connectez-vous pour acc&eacute;der &agrave; une exp&eacute;rience personnalis&eacute;e, retrouver toutes vos commandes pass&eacute;es &#40;bientôt disponible&#41;, et prendre une longueur d&rsquo;avance sur les privil&egrave;ges &agrave; venir&nbsp;!
          </p>
          <p className="text-muted-foreground text-center">
            🎁 Un programme de fid&eacute;lit&eacute; se pr&eacute;pare en coulisses&hellip; Vos achats d&rsquo;aujourd&rsquo;hui pourraient bien vous r&eacute;server des surprises demain&nbsp;!
          </p>
          <SignInButton mode="modal">
            <Button className="bg-gold/10 text-bissap border border-gold py-2 mt-2 w-full rounded-md font-medium hover:bg-gold hover:text-white transition-colors duration-300 ease-in-out cursor-pointer hoverEffect" size="lg">
              Se connecter
            </Button>
          </SignInButton>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            Vous n&rsquo;avez pas encore de compte ?
          </div>
          <SignUpButton mode="modal">
            <Button variant="outline" className="bg-white text-bissap border border-bissap py-2 w-full rounded-md font-medium hover:bg-bissap hover:text-white transition-colors duration-300 ease-in-out cursor-pointer hoverEffect" size="lg">
              Cr&eacute;er un compte
            </Button>
          </SignUpButton>
        {/*<br/>
           <p className="text-center text-sm cursor-pointer">
            Continuer sans compte
          </p> */}
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignInPrompt