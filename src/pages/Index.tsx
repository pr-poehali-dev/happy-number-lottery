import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const winningNumbers = [7, 13, 21, 42, 88, 99];

const topWinners = [
  { name: 'Алексей М.', prize: '🎁 iPhone 15 Pro', number: 7, date: '15.01.2026' },
  { name: 'Мария К.', prize: '💎 MacBook Air', number: 42, date: '14.01.2026' },
  { name: 'Дмитрий П.', prize: '🎧 AirPods Pro', number: 13, date: '13.01.2026' },
  { name: 'Елена С.', prize: '⌚ Apple Watch', number: 88, date: '12.01.2026' },
  { name: 'Иван Б.', prize: '🎮 PlayStation 5', number: 21, date: '11.01.2026' },
];

export default function Index() {
  const [luckyNumber, setLuckyNumber] = useState('');
  const [result, setResult] = useState<'win' | 'lose' | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const checkNumber = () => {
    const number = Number(luckyNumber);
    
    if (!luckyNumber || isNaN(number)) {
      toast.error('Введите корректный номер!');
      return;
    }

    if (winningNumbers.includes(number)) {
      setResult('win');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      toast.success('🎉 Поздравляем! Вы выиграли!');
    } else {
      setResult('lose');
      toast.info('Попробуйте снова!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              {['🎉', '🎊', '✨', '🎁', '💎', '⭐'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      )}

      <header className="bg-white/80 backdrop-blur-md border-b border-purple-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              🎉 Розыгрыш Призов
            </h1>
            <nav className="hidden md:flex gap-6">
              <a href="#home" className="text-foreground/80 hover:text-primary transition-colors font-medium">Главная</a>
              <a href="#draw" className="text-foreground/80 hover:text-primary transition-colors font-medium">Розыгрыш</a>
              <a href="#winners" className="text-foreground/80 hover:text-primary transition-colors font-medium">Победители</a>
              <a href="#rules" className="text-foreground/80 hover:text-primary transition-colors font-medium">Правила</a>
              <a href="#contact" className="text-foreground/80 hover:text-primary transition-colors font-medium">Контакты</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-20">
        <section id="home" className="text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h2 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
              Испытай Удачу!
            </h2>
            <p className="text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto">
              Введи свой счастливый номер и выиграй потрясающие призы 🎁
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-5xl animate-bounce-in">
            <span>🎁</span>
            <span>💎</span>
            <span>🎉</span>
            <span>⭐</span>
            <span>🎊</span>
            <span>✨</span>
          </div>

          <Card className="max-w-md mx-auto shadow-2xl border-2 border-primary/20 animate-scale-in">
            <CardHeader className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
              <CardTitle className="text-2xl text-center">Проверь свой номер</CardTitle>
              <CardDescription className="text-center">Может именно ты станешь следующим победителем?</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <Input
                type="number"
                placeholder="Введи счастливый номер..."
                value={luckyNumber}
                onChange={(e) => setLuckyNumber(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && checkNumber()}
                className="text-lg h-14 text-center border-2 border-primary/30 focus:border-primary"
              />
              <Button
                onClick={checkNumber}
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all hover:scale-105"
              >
                Узнать результат! 🎯
              </Button>

              {result && (
                <div className={`p-6 rounded-lg text-center space-y-3 animate-bounce-in ${
                  result === 'win' 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300' 
                    : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300'
                }`}>
                  {result === 'win' ? (
                    <>
                      <div className="text-4xl">🎉🎊✨</div>
                      <h3 className="text-2xl font-bold text-green-700">Поздравляем!</h3>
                      <p className="text-lg text-green-600">Вы выиграли! 🎁</p>
                      <p className="text-sm text-green-600">Напишите нам в Telegram для получения приза:</p>
                      <Button 
                        asChild
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                      >
                        <a href="https://t.me/downloadvkmuz" target="_blank" rel="noopener noreferrer">
                          <Icon name="Send" className="mr-2" size={20} />
                          Написать в Telegram
                        </a>
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl">💪</div>
                      <h3 className="text-xl font-bold text-blue-700">Не расстраивайся!</h3>
                      <p className="text-blue-600">В следующий раз тебе точно повезет!</p>
                      <Button 
                        onClick={() => {
                          setLuckyNumber('');
                          setResult(null);
                        }}
                        variant="outline"
                        className="border-blue-300 text-blue-600 hover:bg-blue-50"
                      >
                        Попробовать снова
                      </Button>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section id="draw" className="space-y-8">
          <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            О Розыгрыше 🎲
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: 'Gift', title: 'Крутые призы', desc: 'iPhone, MacBook, PlayStation и многое другое!' },
              { icon: 'Users', title: 'Честная игра', desc: 'Прозрачная система определения победителей' },
              { icon: 'Trophy', title: 'Каждый день', desc: 'Новые победители каждый день!' },
            ].map((item, idx) => (
              <Card key={idx} className="text-center hover:shadow-xl transition-all hover:scale-105 border-2 border-primary/20">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Icon name={item.icon as any} size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="winners" className="space-y-8">
          <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Топ Победителей 🏆
          </h2>
          <Card className="max-w-4xl mx-auto shadow-2xl border-2 border-secondary/20">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">Место</th>
                      <th className="px-6 py-4 text-left font-bold">Победитель</th>
                      <th className="px-6 py-4 text-left font-bold">Номер</th>
                      <th className="px-6 py-4 text-left font-bold">Приз</th>
                      <th className="px-6 py-4 text-left font-bold">Дата</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topWinners.map((winner, idx) => (
                      <tr key={idx} className="border-b hover:bg-purple-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {idx === 0 && <span className="text-2xl">🥇</span>}
                            {idx === 1 && <span className="text-2xl">🥈</span>}
                            {idx === 2 && <span className="text-2xl">🥉</span>}
                            {idx > 2 && <span className="text-xl font-bold text-muted-foreground">#{idx + 1}</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold">{winner.name}</td>
                        <td className="px-6 py-4">
                          <span className="bg-primary/20 text-primary px-3 py-1 rounded-full font-bold">
                            {winner.number}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-lg">{winner.prize}</td>
                        <td className="px-6 py-4 text-muted-foreground">{winner.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="rules" className="space-y-8">
          <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Правила Участия 📜
          </h2>
          <Card className="max-w-3xl mx-auto shadow-2xl border-2 border-accent/20">
            <CardContent className="p-8 space-y-6">
              {[
                { icon: 'CheckCircle2', text: 'Введи свой счастливый номер от 1 до 100' },
                { icon: 'CheckCircle2', text: 'Если твой номер совпал с выигрышным - ты победил!' },
                { icon: 'CheckCircle2', text: 'Свяжись с нами в Telegram для получения приза' },
                { icon: 'CheckCircle2', text: 'Каждый участник может играть неограниченное количество раз' },
                { icon: 'CheckCircle2', text: 'Призы выдаются в течение 24 часов после победы' },
              ].map((rule, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <Icon name={rule.icon as any} className="text-accent mt-1" size={24} />
                  <p className="text-lg text-foreground/80">{rule.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section id="contact" className="text-center space-y-8">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Контакты 📱
          </h2>
          <Card className="max-w-md mx-auto shadow-2xl border-2 border-primary/20">
            <CardContent className="pt-8 space-y-6">
              <p className="text-lg text-foreground/70">
                Есть вопросы? Напиши нам в Telegram!
              </p>
              <Button 
                asChild
                size="lg"
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                <a href="https://t.me/downloadvkmuz" target="_blank" rel="noopener noreferrer">
                  <Icon name="Send" className="mr-2" size={24} />
                  Написать в Telegram
                </a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-t border-purple-200 mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-foreground/60">
            © 2026 Розыгрыш Призов. Удачи! 🍀
          </p>
        </div>
      </footer>
    </div>
  );
}
