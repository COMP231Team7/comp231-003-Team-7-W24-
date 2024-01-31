import { createTheme } from '@material-ui/core/styles' 
import { pink } from '@material-ui/core/colors'
const theme = createTheme({ 
typography: {
useNextVariants: true, 
},
palette: {
primary: {
    light: '#8fcb9b', 
    main: '#fff', 
    dark: '#5b9279', 
    contrastText: '#12130f',
},
secondary: {
    light: '#ff79b0', 
    main: '#5b9279', 
    dark: '#c60055', 
    contrastText: '#fff',
},
openTitle: '#3f4771', 
protectedTitle: pink['400'], 
type: 'light'
} 
})
export default theme