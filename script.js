// ==========================================
// 1. CONSUMINDO A API DO GITHUB
// ==========================================

const GITHUB_USER = "Talys-oliveira"; 

async function carregarProjetosGitHub() {
    const containerProjetos = document.getElementById('lista-projetos');

    try {
        // Faz a requisição para a API pública do GitHub
        const resposta = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`);
        
        if (!resposta.ok) {
            throw new Error('Não foi possível buscar os repositórios.');
        }

        const projetos = await resposta.json();

        
        containerProjetos.innerHTML = '';

        
        const repositoriosValidos = projetos.filter(repo => !repo.fork);

        if (repositoriosValidos.length === 0) {
            containerProjetos.innerHTML = '<p>Nenhum projeto público encontrado no momento.</p>';
            return;
        }

        repositoriosValidos.forEach(projeto => {
            
            const card = document.createElement('div');
            card.classList.add('projeto-card');

            
            const descricao = projeto.description ? projeto.description : 'Sem descrição cadastrada.';
            
           
            const linguagem = projeto.language ? `<span class="tag-linguagem">💻 ${projeto.language}</span>` : '';

            card.innerHTML = `
                <h3>${projeto.name}</h3>
                <p>${descricao}</p>
                <div class="card-footer">
                    ${linguagem}
                    <a href="${projeto.html_url}" target="_blank" rel="noopener noreferrer">Ver no GitHub</a>
                </div>
            `;

            containerProjetos.appendChild(card);
        });

    } catch (erro) {
        console.error('Erro:', erro);
        containerProjetos.innerHTML = '<p>Erro ao carregar os projetos do GitHub. Verifique seu nome de usuário no código JS.</p>';
    }
}


carregarProjetosGitHub();


// ==========================================
// 2. SIMULAÇÃO DO FORMULÁRIO DE CONTATO
// ==========================================

const formContato = document.getElementById('form-contato');
const formStatus = document.getElementById('form-status');

formContato.addEventListener('submit', function(e) {
    e.preventDefault(); 


    const nome = document.getElementById('nome').value;
    
    
    formStatus.style.color = '#16a34a';
    formStatus.textContent = `Obrigado pela mensagem, ${nome}! (Em breve integraremos com um serviço de envio real como Web3Forms).`;

   
    formContato.reset();

    
    setTimeout(() => {
        formStatus.textContent = '';
    }, 6000);
});

