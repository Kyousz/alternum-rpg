/* Efeito de Luz Mística (Spotlight)
*/

// "Ouve" pelo evento 'mousemove' na janela inteira
document.addEventListener("mousemove", function(e) {

    // 1. Captura as coordenadas X (e.clientX) e Y (e.clientY) do mouse
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    // 2. Define essas coordenadas como variáveis CSS globais
    //    O <html> (document.documentElement) vai ter acesso
    //    a '--mouse-x' e '--mouse-y'
    document.documentElement.style.setProperty('--mouse-x', mouseX + 'px');
    document.documentElement.style.setProperty('--mouse-y', mouseY + 'px');
});