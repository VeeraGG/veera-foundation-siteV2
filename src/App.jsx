import React, { useState } from 'react'
import { motion } from 'framer-motion'

/*
  Veera - Alternate Colorful Interactive Single-file React App
  - Uses Veera brand palette (red, orange, yellow, pink, green, blue)
  - Interactive banner, animated cards, illustrated SVG accents
  - Designed as a drop-in src/App.jsx replacement for the Vite project
  - Minimal external deps: react + framer-motion + Tailwind (assumed available)
*/

const COLORS = {
  red: '#ED332B',
  orange: '#F79433',
  yellow: '#FFCC32',
  pink: '#F287B7',
  darkGreen: '#00512D',
  darkBlue: '#194E83',
  cream: '#FFFCD5',
  black: '#2e2c2b'
}

function IconSpark({ color = COLORS.yellow, x = 0, y = 0 }) {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" className="inline-block" style={{transform:`translate(${x}px, ${y}px)`}}>
      <circle cx="12" cy="12" r="10" fill={color} opacity="0.18" />
      <path d="M12 6v12M6 12h12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const Nav = ({ setPage, page }) => (
  <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b">
    <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{background:COLORS.red}}>
          <svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="white"/></svg>
        </div>
        <div>
          <div className="font-semibold text-sm">Veera Foundation</div>
          <div className="text-xs text-neutral-500">Reimagining masculinity</div>
        </div>
      </div>

      <nav className="hidden md:flex gap-2">
        {['home','about','dna','contact','faqs'].map(k => (
          <button key={k} onClick={() => setPage(k)} className={`px-3 py-2 rounded ${page===k? 'shadow-md bg-white font-semibold':'text-neutral-600'}`}>
            {k === 'home' ? 'Home' : k === 'dna' ? 'Our DNA' : k.charAt(0).toUpperCase()+k.slice(1)}
          </button>
        ))}
      </nav>

      <div className="md:hidden">
        <select onChange={(e)=>setPage(e.target.value)} value={page} className="border rounded p-1 text-sm">
          <option value="home">Home</option>
          <option value="about">About</option>
          <option value="dna">Our DNA</option>
          <option value="contact">Contact</option>
          <option value="faqs">FAQs</option>
        </select>
      </div>
    </div>
  </header>
)

const Banner = ({ onCTAClick }) => (
  <section className="bg-gradient-to-br from-[rgba(237,51,43,0.08)] to-[rgba(25,78,131,0.04)]">
    <div className="mx-auto max-w-6xl px-4 py-16 flex flex-col md:flex-row items-center gap-8">
      <div className="flex-1">
        <motion.h1 initial={{y:6,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.05}} className="text-4xl md:text-5xl font-bold leading-tight" style={{color:COLORS.black}}>
          Reimagining masculinity — together.
        </motion.h1>
        <motion.p initial={{y:6,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.12}} className="mt-4 text-lg text-neutral-700 max-w-2xl">
          Veera Foundation is a Mumbai-based non-profit that helps men grow with empathy and accountability — not as bystanders, but as partners in change.
        </motion.p>

        <motion.div className="mt-6 flex gap-3" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}}>
          <button onClick={onCTAClick} className="rounded-full px-5 py-2 font-semibold shadow" style={{background:COLORS.red,color:'#fff'}}>Join our work</button>
          <button className="rounded-full px-4 py-2 border font-medium" style={{borderColor:COLORS.darkBlue,color:COLORS.darkBlue}}>Learn more</button>
        </motion.div>

        <div className="mt-6 flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <IconSpark color={COLORS.yellow} />
            <div className="text-sm text-neutral-600">Programs • Research • Community</div>
          </div>
        </div>
      </div>

      <motion.div initial={{scale:0.98,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:0.1}} className="w-full md:w-1/3">
        {/* Illustrated panel (SVG illustration placeholder) */}
        <div className="rounded-2xl p-6" style={{background:COLORS.cream}}>
          <svg viewBox="0 0 200 140" className="w-full h-44">
            <rect width="200" height="140" rx="12" fill={COLORS.cream} />
            <g transform="translate(20,18)">
              <circle cx="24" cy="36" r="22" fill={COLORS.orange} opacity="0.95" />
              <rect x="60" y="20" width="90" height="70" rx="10" fill={COLORS.pink} opacity="0.9" />
              <circle cx="130" cy="45" r="12" fill={COLORS.red} />
            </g>
          </svg>
          <div className="mt-3 text-sm text-neutral-700">Illustration: Men growing together — simple shapes, bright colours.</div>
        </div>
      </motion.div>
    </div>
  </section>
)

const IdeaCard = ({ title, desc, color }) => (
  <motion.div whileHover={{y:-6,scale:1.02}} className="p-5 rounded-2xl shadow-md" style={{background:color}}>
    <div className="font-semibold text-white">{title}</div>
    <div className="mt-2 text-sm text-white/90">{desc}</div>
  </motion.div>
)

const Poll = ({ poll, onVote, selected }) => (
  <div className="p-4 border rounded-lg">
    <div className="font-medium mb-3">{poll.q}</div>
    <div className="grid gap-2">
      {poll.options.map(o => (
        <button key={o} onClick={()=>onVote(poll.id,o)} className={`text-sm p-2 rounded ${selected===o? 'bg-black text-white' : 'bg-white border'}`}>{o}</button>
      ))}
    </div>
  </div>
)

export default function App() {
  const [page, setPage] = useState('home')
  const [votes, setVotes] = useState({})

  const polls = [
    { id: 1, q: 'What makes someone a true ally?', options: ['Listening deeply','Speaking up against bias','Sharing responsibilities equally'] },
    { id: 2, q: 'Which stereotype about men do you wish would change?', options: ['Men shouldn’t cry','Men must always provide','Men must be tough and strong'] },
    { id: 3, q: 'What motivates you to stand up for others?', options: ['Fairness and justice','Empathy','Personal experience'] }
  ]

  function handleVote(id, opt) {
    setVotes(prev=>({ ...prev, [id]: opt }))
    // placeholder: in a real site we would POST this to a backend
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Nav setPage={setPage} page={page} />
      <main>
        {page === 'home' && (
          <>
            <Banner onCTAClick={()=>setPage('about')} />

            <section className="mx-auto max-w-6xl px-4 py-12">
              <h3 className="text-xl font-semibold mb-4">Our Idea</h3>
              <p className="text-neutral-700 mb-6">At Veera Foundation, we believe masculinity is not to be defended or feared, but to be reimagined. Our work rests on four interconnected ideas —

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div onClick={()=>alert('Positive Masculinity clicked')}>
                  <IdeaCard title="Positive Masculinity" desc="Strength with empathy. Courage with care. A way of being that lets men live fuller, more connected lives." color={COLORS.red} />
                </div>
                <div onClick={()=>alert('Allyship clicked')}>
                  <IdeaCard title="Allyship" desc="Standing with others, not above them. Using privilege to open doors: not close them." color={COLORS.darkGreen} />
                </div>
                <div onClick={()=>alert('Shared Responsibility clicked')}>
                  <IdeaCard title="Shared Responsibility" desc="Equality is everyone’s work. No one should carry the weight of change alone." color={COLORS.orange} />
                </div>
                <div onClick={()=>alert('Community clicked')}>
                  <IdeaCard title="Community" desc="Masculinity need not be isolation. Support and connection help men — and society — thrive." color={COLORS.darkBlue} />
                </div>
              </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 py-8 bg-[linear-gradient(90deg,rgba(247,148,51,0.04),rgba(237,51,43,0.02))] rounded-b-2xl">
              <div className="grid md:grid-cols-2 gap-6 items-start">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Why Masculinity? Why Now?</h4>
                  <p className="text-neutral-700"><strong>Why Masculinity:</strong> Masculinity shapes societies. When it is rigid, it weighs men down and strains their relationships. When it is allowed to grow with empathy, courage, and self-awareness, men flourish; and so does everyone around them.</p>
                  <p className="mt-3 text-neutral-700"><strong>Why Now:</strong> Because the moment is ripe for change. Today, gender conversations are more accessible than ever thanks to the work of those who came before us. Yet many men remain on the margins, unsure where they fit. Now is the time to invite them in.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Tell us what you think</h4>
                  <div className="grid gap-3">
                    {polls.map(p => <Poll key={p.id} poll={p} onVote={handleVote} selected={votes[p.id]} />)}
                    <div className="text-sm text-neutral-500">Your responses are local demo values. For live data, we can hook these to Google Sheets or Airtable.</div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {page === 'about' && (
          <section className="mx-auto max-w-6xl px-4 py-12">
            <h2 className="text-2xl font-semibold mb-4">About Us</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold">Our Story</h3>
                <p className="text-neutral-700 mt-2">Veera began with a quiet but powerful insight: the story of gender change has often left men on the sidelines. While women and marginalized groups carried the weight of transformation, men were told who they “should” be instead of invited to explore who they could become.</p>

                <h4 className="mt-4 font-semibold">Problem</h4>
                <p className="text-neutral-700 mt-2">The blueprint of orthodox masculinity passed down to men is narrow and heavy. It asks them to hide emotions, bear burdens alone, and lead by control: cutting them off from care, connection, and growth.</p>

                <h4 className="mt-4 font-semibold">Solution</h4>
                <p className="text-neutral-700 mt-2">At Veera, we design spaces and tools that invite men to move beyond outdated stereotypes: to grow into open, connected allies who build safer, more compassionate futures alongside others.</p>
              </div>

              <div>
                <div className="rounded-2xl p-6" style={{background:COLORS.cream}}>
                  <h4 className="font-semibold">Why it matters </h4>
                  <p className="mt-2 text-neutral-700">Men make up more than half of India’s population — yet only <strong>0.3%</strong> of gender equality efforts engage them meaningfully (UNESCO, 2022).</p>
                  <p className="mt-2 text-neutral-700">Veera exists to change this — because when men are seen, supported, and invited to grow, everyone benefits.</p>
                </div>

                <div className="mt-4 grid gap-3">
                  <div className="p-4 border rounded-lg">Vision: We envision a generation of men redefining masculinity through empathy and allyship.</div>
                  <div className="p-4 border rounded-lg">Mission: We create spaces, tools and experiences that spark curiosity and inspire self-growth.</div>
                </div>
              </div>
            </div>

            <section className="mt-6">
              <h4 className="font-semibold mb-3">Our Partners</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {title:'Research', standup:'Academic institutions and think tanks', popup:'Generate evidence-based insights.'},
                  {title:'Programs', standup:'NGOs, community groups', popup:'Co-design and scale programs.'},
                  {title:'Funding', standup:'Philanthropies and CSR', popup:'Fuel scalable solutions.'},
                  {title:'Campaigns', standup:'Creative agencies and media', popup:'Amplify reach through storytelling.'}
                ].map(p => (
                  <motion.button whileHover={{scale:1.02}} key={p.title} className="p-4 rounded-lg border text-left" onClick={()=>alert(`${p.title}: ${p.popup}`)}>
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-sm text-neutral-600">{p.standup}</div>
                  </motion.button>
                ))}
              </div>
            </section>
          </section>
        )}

        {page === 'dna' && (
          <section className="mx-auto max-w-6xl px-4 py-12">
            <h2 className="text-2xl font-semibold mb-4">Our DNA</h2>
            <p className="text-neutral-700">At Veera, Positive Masculinity and Allyship form the core of what we do. Below are the four pillars that guide our work.</p>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold">Courage</h4>
                <p className="text-neutral-700 mt-2">The choice to be vulnerable and to act even when it feels uncomfortable.</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold">Care</h4>
                <p className="text-neutral-700 mt-2">Care is strength — listening deeply and practicing empathy.</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold">Community</h4>
                <p className="text-neutral-700 mt-2">We grow stronger together — transformation is a collective journey.</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold">Curiosity</h4>
                <p className="text-neutral-700 mt-2">The willingness to learn, unlearn, and remain open to new perspectives.</p>
              </div>
            </div>
          </section>
        )}

        {page === 'contact' && (
          <section className="mx-auto max-w-4xl px-4 py-12">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <div className="rounded-2xl p-6 border" style={{background:'#fff'}}>
              <form onSubmit={(e)=>{e.preventDefault(); alert('Thanks — we will get back to you.')}} className="grid gap-3">
                <input required placeholder="Full Name" className="w-full border p-2 rounded" />
                <input required placeholder="Email Address" type="email" className="w-full border p-2 rounded" />
                <input placeholder="Phone Number (optional)" className="w-full border p-2 rounded" />
                <input required placeholder="Organization / Institution" className="w-full border p-2 rounded" />
                <select required className="w-full border p-2 rounded">
                  <option value="">I’m reaching out as a…</option>
                  <option>Individual</option>
                  <option>Educator / College/ School</option>
                  <option>Corporate Partner</option>
                  <option>Non-profit / Community Organization</option>
                  <option>Media / Storyteller/ Influencer</option>
                  <option>Funder / Supporter</option>
                  <option>Other</option>
                </select>

                <div className="grid sm:grid-cols-2 gap-2">
                  {['Partner on Programs and Campaigns','Collaborate on Research','Volunteer','Fund / Support','Media / Storytelling Collaboration','General Inquiry','Work at Veera/ Career opportunity'].map(o=> (
                    <label key={o} className="flex items-center gap-2 border rounded p-2 text-sm"><input type="checkbox"/>{o}</label>
                  ))}
                </div>

                <textarea placeholder="Tell us a little about what you have in mind…" rows={4} className="w-full border p-2 rounded"></textarea>
                <button className="w-full py-2 rounded" style={{background:COLORS.darkGreen,color:'#fff'}}>Send message</button>
              </form>

              <div className="mt-4 text-sm text-neutral-600">You can also write to us at <strong>Info.veera@xx</strong></div>
            </div>
          </section>
        )}

        {page === 'faqs' && (
          <section className="mx-auto max-w-6xl px-4 py-12">
            <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {q:'What does the Veera Foundation do?', a:'We create spaces and experiences for men to reflect, grow, and practice allyship.'},
                {q:'Why focus on men?', a:'Men make up half the population — engaging them unlocks meaningful change for everyone.'},
                {q:'Who does Veera work with?', a:'We engage boys and men in schools, colleges, workplaces, and communities.'},
                {q:'How can organisations partner with Veera?', a:'Reach out through our contact form to start a conversation.'}
              ].map(it=> (
                <details key={it.q} className="rounded border p-3">
                  <summary className="font-medium cursor-pointer">{it.q}</summary>
                  <p className="mt-2 text-neutral-700">{it.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="mt-12 border-t">
        <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="font-semibold">Veera Foundation</div>
            <div className="text-sm text-neutral-600">Reimagining masculinity through empathy and allyship</div>
          </div>
          <div className="text-sm text-neutral-600">© {new Date().getFullYear()} Veera Foundation</div>
        </div>
      </footer>
    </div>
  )
}
