document.addEventListener('DOMContentLoaded', () => {
    console.log("Site de Hospedagem de Jogo Construct 3 iniciado!");
    
    const navLinks = document.querySelectorAll('#nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            console.log(`Você está passando o mouse sobre o link: ${link.textContent}`);
        });
    });

    // Aqui você pode adicionar lógica para carregar o seu jogo exportado
    // como, por exemplo, criar um iframe se for um export HTML5 do Construct 3
});
