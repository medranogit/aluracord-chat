import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';



export default function ChatPage() {
    const [placeholder, setPlaceholder] = React.useState("Insira sua mensagem aqui...");
    const [mensagem, setMensagem] = React.useState('');
    const [listaMensagem, setListaMensagem] = React.useState([]);

    /*Sua lógica vai aqui
        - Usuario escreve no campo
        - Aperta enter para enviar
        - Tem que adicionar o texto em uma lista
    ./Sua lógica vai aqui */

    /* Check DEV
    - [X] Campo criado
    - [X] Vamos usar o onChange usa o useState (ter if pra caso seja enter pra limpar a variavel)
    - [X] Lista de mensagens 
    - [ ] Botao de deletar
    */

    function handleNovaMensagem(novaMensagem) { 
        //Estrutura condicional para ter uma quantidade minima de caracteres para envio.
        if (novaMensagem.length > 0) {
            const mensagem = {
                id: listaMensagem.length + 1,
                de: 'medranogit',
                texto: novaMensagem,
            };

            setListaMensagem([
                mensagem,
                ...listaMensagem,
            ]);
            setMensagem(''); // Para limpar o campo de mensagens após o enter
            setPlaceholder('Insira sua mensagem aqui...');

        } else {
            setPlaceholder('Mensagem inexistente, escreva algo.');
            setMensagem('')
        }


    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: 'url(https://i.imgur.com/PN5oUD5.jpg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '70%',
                    maxHeight: '80vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaMensagem} />
                    {/* ta mudando o valor: {mensagem} */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            //Mandando o valor mensagem para o usestate
                            value={mensagem}
                            //Onchange = em cada mudança
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}

                            onKeyPress={(event) => {
                                //Mandar valor para a lista chat
                                if (event.key === 'Enter') {
                                    event.preventDefault(); // Para nao ficar pulando linha
                                    // console.log('entrou no if'); 
                                    handleNovaMensagem(mensagem); //Função enviar nova mensagem lista
                                }
                                // console.log(event.key);
                            }}
                            
                            placeholder={placeholder}
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            label='Enviar'
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                            //Sistema de envio baseado no click do botao
                            onClick={() => {
                                // console.log('esta sendo clicado')
                                handleNovaMensagem(mensagem);
                            }}
                        />

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}


function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    // console.log('MessageList', props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (

                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/medranogit.png`}
                            />
                            <Text tag="strong"
                                styleSheet={{
                                    fontSize: '12px',
                                    display: 'inline-block',
                                }}
                            >
                                {mensagem.de}

                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    display: 'inline-block',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        <Text styleSheet={{
                            fontSize: '17px',
                            fontFamily: 'Calibri'

                        }}>
                            {mensagem.texto}        
                        </Text>

                        

                    </Text>
                )
            })}


        </Box>
    )
}