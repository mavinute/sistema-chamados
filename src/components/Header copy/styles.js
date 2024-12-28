import styled from 'styled-components'

import coverImg from '../../assets/logo.png'

export const SideBar = styled.header`
    margin: 0;
    padding: 0;
    background: #181c2e;
    position: fixed;
    overflow: auto;
    height: 100vh;
    width: 250px;

    .background-avatar {
        background-image: url(${coverImg});
        background-color: #181c2e;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 150px;
        padding-top: 30px;

        img {
            width: 90px;
            height: 90px;
            display: block;
            margin: auto;
            border-radius: 50%;
            object-fit: cover;
            filter: drop-shadow(2px 3px 6px #121212);
            -webkit-filter: drop-shadow(2px 3px 6px #121212)
        }
    }

    a {
        display: block;
        padding: 16px;
        display: flex;
        text-decoration: none;
        color: rgba(255, 255, 255, 0.7);
        flex-direction: row;
        align-items: center;
        transition: ease-in-out 0.4s;

        svg {
            margin-right: 10px;
        }

        transition: filter 0.5s;

        &:hover{
            filter: brightness(0.8);
        }
    }

    @media(max-width: 700px){
        width: 100%;
        height: auto;
        position: relative;

        .background-avatar{
            display: none;
        }

        a {
            float: left;
        }
    }

    @media screen and(max-width: 400px){
        width: 100%;
        height: auto;
        position: relative;

        a {
            float: left;

            svg {
                display: none;
            }
        }
    }

`