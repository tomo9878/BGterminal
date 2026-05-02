import './App.css'

const GAMES = [
  {
    id: 'hannnibal',
    title: 'Hannibal Solo',
    description: 'ハンニバル ソロプレイ — カルタゴvsローマの名将ハンニバルを指揮する戦略ゲーム',
    path: '/games/hannnibal/',
    color: '#8B1A1A',
    icon: '⚔️',
    tags: ['ソロ', 'ウォーゲーム', '歴史'],
  },
  {
    id: 'manilla',
    title: 'Manila 1945',
    description: 'マニラ1945 — 第二次世界大戦末期、米軍のマニラ市街戦を指揮するソロウォーゲーム',
    path: '/games/manilla/',
    color: '#1A5276',
    icon: '🪖',
    tags: ['ソロ', 'ウォーゲーム', '第二次大戦'],
  },
  {
    id: 'pandemic_rome',
    title: 'Pandemic: Fall of Rome',
    description: 'パンデミック：ローマの崩壊 — 協力してローマ帝国を蛮族の侵攻から守る協力ゲーム',
    path: '/games/pandemic_rome/',
    color: '#6E2C00',
    icon: '🏛️',
    tags: ['協力', '歴史', 'ローマ'],
  },
]

function GameCard({ game }) {
  return (
    <a href={game.path} className="game-card" style={{ '--card-color': game.color }}>
      <div className="card-icon">{game.icon}</div>
      <div className="card-body">
        <h2 className="card-title">{game.title}</h2>
        <p className="card-description">{game.description}</p>
        <div className="card-tags">
          {game.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
      <div className="card-footer">プレイする →</div>
    </a>
  )
}

export default function App() {
  return (
    <div className="portal">
      <header className="portal-header">
        <h1>🎲 Game Portal</h1>
        <p>ブラウザで遊べる歴史戦略ゲーム集</p>
      </header>
      <main className="games-grid">
        {GAMES.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </main>
      <footer className="portal-footer">
        {GAMES.length} games available
      </footer>
    </div>
  )
}
