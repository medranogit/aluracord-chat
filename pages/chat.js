import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient} from '@supabase/supabase-js';
import { ThreeDots } from 'react-loading-icons'
import { useRouter } from "next/router";
import { ButtonSendSticker } from "../src/components/ButtonSendSticker";
import { SendButton } from "../src/components/SendButton";

//Endereços supabase
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQ4OTkzNCwiZXhwIjoxOTU5MDY1OTM0fQ.mq4UggurcyECcq5qMcrT5HZWFfV0N0FXdq2x004_D5I';
const SUPABASE_URL = 'https://xkrvolweqgnjdzpfjqpk.supabase.co';
const supabaseClient = createClient(SUPABASE_URL,SUPABASE_ANON_KEY);

function escutaMensagem(adicionaMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostasaovivo) =>{
            adicionaMensagem(respostasaovivo.new);
        })
        .subscribe();
}

export default function ChatPage() {
    const [placeholder, setPlaceholder] = React.useState("Insira sua mensagem aqui...");
    const [mensagem, setMensagem] = React.useState('');
    const [listaMensagem, setListaMensagem] = React.useState([]);
    // useState para o loading
    const [loading, setLoading] = React.useState(true);
    //User atual recebendo por url da outra pagina
    const router = useRouter();
    // const { username } = router.query;
    const username = router.query.username;

    //Pesquisar
    React.useEffect(() =>{
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data })=>{
                console.log('dados da comsulta: ', data); 
                setListaMensagem(data);
                setLoading(false);
            });
        
        escutaMensagem((novaMensagem) => {
            console.log('Nova mensagem'+ novaMensagem);
            setListaMensagem((valorAtualdaLista)=>{
                return[
                    novaMensagem,
                    ...valorAtualdaLista,
                ]
            })
        })
        
    }, []);
 

    /*Sua lógica vai aqui
        - Usuario escreve no campo
        - Aperta enter para enviar
        - Tem que adicionar o texto em uma lista
    ./Sua lógica vai aqui */

    /* Check DEV
    - [X] Campo criado
    - [X] Vamos usar o onChange usa o useState (ter if pra caso seja enter pra limpar a variavel)
    - [X] Lista de mensagens 
    - [X] Banco de dados insert e consulta SUPABASE
    */

    function handleNovaMensagem(novaMensagem) { 
        //Estrutura condicional para ter uma quantidade minima de caracteres para envio.
        if (novaMensagem.length > 0) {
            const mensagem = {
                de: username,
                texto: novaMensagem,
            };

            supabaseClient
                .from('mensagens')
                .insert([
                    // Tem que ser objeto com os mesmos campos que voce escreveu no Supabase
                    mensagem
                ])
                .then(( {data} ) =>{
                    console.log('Criando mensagem: ', data);
                });
                
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
                backgroundColor: appConfig.theme.colors.primary[100],
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
                <Header user={username} />
                
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
                    {loading ? (
                        <Box
                        styleSheet={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                        }}
                        >
                        <ThreeDots
                            fill={appConfig.theme.colors.neutrals[200]}
                            height="16px"
                        />
                        </Box>
                    ) : (
                        <MessageList mensagens={listaMensagem} />
                        // ta mudando o valor: {mensagem}
                    )}
                    
                    
                    
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >   
                        {/* BOTAO DE STICKERS */}
                        <ButtonSendSticker 
                            //caso se usado o onStickerClick
                            //chama callback
                            onStickerClick = {(sticker)=>(
                                console.log('Salva esse sitcker no banco'),
                                handleNovaMensagem(':sticker:'+sticker)
                            )}
                        />
                       
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
                        {/* BOTAO DE ENVIO */}
                        < SendButton 
                            onSendTrigger = {() =>(
                                console.log('Salva esse sitcker no banco'   ),
                                handleNovaMensagem(mensagem)
                            )}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}


function Header(props) {
    return (
        <>  
            <Box styleSheet={{ 
                width: '100%', 
                marginBottom: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between' 
                }} >
                <Text variant='heading5'>
                    Chat - {props.user}
                </Text>

                <Button
                styleSheet={{
                    backgroundColor: appConfig.theme.colors.primary[500],
                    color:'white'
                }}
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
                                    hover: {
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '0%',
                                      },
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
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
                        {/* Estrutura Condicional */} 

                        {/* If começar com ':sticker:' */}

                        {mensagem.texto.startsWith(':sticker:')
                        ? (
                            <Image styleSheet={{
                                maxWidth:'150px',
                            }} src={mensagem.texto.replace(':sticker:', '')}/>
                        //else
                        ):(
                            <Text styleSheet={{
                                fontSize    : '17px',
                                fontFamily: 'Calibri'
    
                            }}>
                                {mensagem.texto}        
                            </Text>
                        )}

                    </Text>
                )
            })}
        </Box>
    )
}