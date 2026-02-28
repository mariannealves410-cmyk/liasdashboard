const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

// Caminho do .env
const envPath = path.join(__dirname, '..', '.env');

if (!fs.existsSync(envPath)) {
    console.error("❌ Arquivo .env não encontrado!");
    process.exit(1);
}

const content = fs.readFileSync(envPath, 'utf8');
const lines = content.split(/\r?\n/);

// Filtra apenas linhas válidas (chave=valor)
const vars = lines
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#'))
    .map(l => {
        const parts = l.split('=');
        const key = parts[0];
        const value = parts.slice(1).join('=');
        return { key, value };
    });

console.log(`🔍 Encontradas ${vars.length} variáveis para enviar.`);

function uploadNext() {
    if (vars.length === 0) {
        console.log("\n🎉 Processo finalizado!");
        console.log("👉 Agora faça um novo deploy para aplicar as mudanças:");
        console.log("   npx vercel --prod");
        return;
    }

    const { key, value } = vars.shift();
    process.stdout.write(`📤 Enviando ${key}... `);

    // Adiciona para Production, Preview e Development (all targets por padrão se não especificar, 
    // mas o comando env add pede environment. Vamos adicionar para production key por key).
    // Na verdade, 'vercel env add' sem args pergunta interativamente.
    // 'vercel env add <name> production' lê do stdin.

    // Vamos fazer para production primeiro, que é o crítico.
    // O comando é: echo valor | npx vercel env add NOME production

    const cmd = `echo ${value} | npx vercel env add ${key} production`;

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            // Se der erro (ex: já existe), apenas avisa
            console.log("⚠️");
            console.log(`   (Pode ser que já exista ou houve erro: ${stderr.split('\n')[0]})`);
        } else {
            console.log("✅");
        }

        // Pequena pausa para não floodar a API
        setTimeout(uploadNext, 1000);
    });
}

uploadNext();
