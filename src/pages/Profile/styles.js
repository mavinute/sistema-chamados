import styled from 'styled-components'

export const Content = styled.div`
    margin-left: 250px;
    padding: 1px 16px;

    form {
        display: flex;
        flex-direction: column;

        background: #f8f8f8;
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 10px;

        .label-avatar {
            width: 280px;
            height: 280px;

            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            cursor: pointer;

            span {
                z-index: 99;
                position: absolute;
                opacity: 0.7;
                transition: all 0.5s;

                &:hover {
                    opacity: 1;
                    transform: scale(1.4);
                }
            }

            input {
                display: none;
            }

            img {
                margin-bottom: 10px;
                border-radius: 50%;
                object-fit: cover;
            }
        }

        label {
            margin: 10px 0;
            font-size: 20px;

            input {
                margin-bottom: 10px;
            }
        }

        input {
            padding: 8px;
            font-size: 15px;
            border: none;
            border-radius: 5px;
            max-width: 600px;
            background: #bdc3c7;

            &:disabled {
                cursor: not-allowed;
            }
        }

        button {
            margin: 15px 0;
            max-width: 600px;
            background: #181c2e;
            color: #fff;
            border: none;
            border-radius: 5px;
            padding: 8px;
            font-size: 15px;
        }
    }

    @media(max-width: 700px){
        margin-left: 0;
    }
`