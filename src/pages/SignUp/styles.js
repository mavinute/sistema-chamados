import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100vh;
    
    background: #121212;

    .box-login {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 600px;
        background: #eaeaea;
        flex-direction: column;

        .logo-area {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 100%;
            background: #181C2e;
            
            img {
                width: 170px;
                height: 130px;
                padding: 20px;
            }
        }

        form {
            margin-top: 20px;
            width: 90%;

            display: flex;
            flex-direction: column;

            h1 {
                text-align: center;
                margin-bottom: 10px;
            }

            input {
                margin-bottom: 10px;
                height: 35px;
                border-radius: 5px;
                border: 0;
                padding: 10px;
                font-size: 15px;
                background: #fff;
            }

            button {
                height: 35px;
                border: 0;
                border-radius: 5px;
                background: #181c2e;
                color: #fff;
                font-size: 15px;
            }
        }

        a {
            margin: 10px;
            color: #181C2e;
            cursor: pointer;
        }

        .btn-google {
            margin: 20px 0;
            width: 90%;

            display: flex;
            flex-direction: column;

            button {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                
                height: 35px;
                border: 0;
                border-radius: 5px;
                background: #c0392b;
                color: #fff;
                font-size: 15px;
            }
        }
    }

`