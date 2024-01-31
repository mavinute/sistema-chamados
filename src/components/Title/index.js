import { TitlePage } from './styles'

export function Title({ children, name }){
    return(
        <TitlePage>
            {children}
            <span>{name}</span>
        </TitlePage>
    )
}