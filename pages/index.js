import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import React from 'react';
import appConfig from '../config.json'
import { useRouter } from 'next/router';

function Title(props) {
  const Tag = props.tag || 'h1';
  return (
    <div>
      <Tag>{props.children}</Tag>

      <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.primary[500]};
                    font-size: 2rem;
                }
            `}</style>
    </div>
  );

}

//   export default HomePage 
export default function PaginaInicial() {
  const defaultUser = '';
  const [username, setUsername] = React.useState(defaultUser);
  const [blog, setBlog] = React.useState(defaultUser);
  const [bio, setBio] = React.useState(defaultUser);


  const roteamento = useRouter();

  //Para saber os comandos é so ver no console log clicando duas vvezes e ira mostrar.
  // console.log(roteamento);

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[100],
          backgroundImage: 'url(https://i.imgur.com/PN5oUD5.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.rgba[300],


          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            // onSubmit={
            onSubmit={function (infosDosEventos) {
              infosDosEventos.preventDefault();
              console.log('submitando');
              //Para passar o dado do index para o chat a informação de quem é o usuario
              roteamento.push(`/chat?username=${username}`);
            }}
            // }
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title>Welcome to our universe</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '20px', marginTop: '13px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.description}
            </Text>


            <TextField
              value={username}
              onChange={function (event) {

                console.log("Usuario digitou - " + event.target.value)
                // console.log(event.target.value.length)

                //onde esta o valor?
                const valor = event.target.value;
                //Trocar o valor da variavel
                setUsername(valor);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />

            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
              styleSheet={{
                marginTop: '10px'
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >

            <ImagemVerify user={username} />

            {/* <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              
              src={`https://github.com/${username}.png`}
            /> */}
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>

            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],

              }}
            >
              {/* onde sera a variavel da bio */}
              {/* {bio}  */}
            </Text>

            <Button
              label='Linkedin'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
              styleSheet={{
                marginTop: '10px'
              }}
            />
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}

function ImagemVerify(props) {
  if (props.user.length < 3) {
    return (
      <Image
        styleSheet={{
          borderRadius: '50%',
          marginBottom: '16px',
        }}

        src={`https://avatars.githubusercontent.com/u/9919?s=460&v=4`}
      />
    )
  }else {
    return (
      <Image
        styleSheet={{
          borderRadius: '50%',
          marginBottom: '16px',
        }}

        src={`https://github.com/${props.user}.png`}
      />
    )
  }
}