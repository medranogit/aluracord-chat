import React from 'react';
import { Button } from '@skynexui/components';
import appConfig from '../../config.json';

export function sendButton() {
    return (
        <Button
            label='Enviar'
            styleSheet={{
                minWidth: '40px',
                minHeight: '40px',
                fontSize: '20px',
                marginBottom: '8px',
                marginRight: '8px',
                lineHeight: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
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
    )
}