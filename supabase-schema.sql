-- 1. Tabela de Projetos
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id TEXT UNIQUE,
    icon TEXT,
    title TEXT NOT NULL,
    subtitle TEXT,
    focus TEXT,
    status TEXT,
    priority TEXT,
    responsible TEXT,
    deadline TEXT,
    description TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabela de Tarefas
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    done BOOLEAN DEFAULT FALSE,
    order_num INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabela de Membros
CREATE TABLE members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    icon TEXT DEFAULT '👤',
    role TEXT DEFAULT 'Membro',
    project_ids UUID[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabela de Eventos
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    color_index INTEGER DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tabela de Atividades
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text TEXT NOT NULL,
    done BOOLEAN DEFAULT FALSE,
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Tabela de Usuários (Auth)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'Membro',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security) mas por enquanto permitir tudo para simplificar a migração
-- Em produção, deveríamos configurar políticas específicas.
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Criar políticas de acesso público (temporário para facilitar)
CREATE POLICY "Permitir tudo para todos" ON projects FOR ALL USING (true);
CREATE POLICY "Permitir tudo para todos" ON tasks FOR ALL USING (true);
CREATE POLICY "Permitir tudo para todos" ON members FOR ALL USING (true);
CREATE POLICY "Permitir tudo para todos" ON events FOR ALL USING (true);
CREATE POLICY "Permitir tudo para todos" ON activities FOR ALL USING (true);
CREATE POLICY "Permitir tudo para todos" ON users FOR ALL USING (true);
