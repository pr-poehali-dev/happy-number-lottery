import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const winningNumbers = [3567, 6473, 9365, 1640, 7473];

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
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: 'url(https://cdn.poehali.dev/files/IMG_20260118_162348_652.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

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

      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40 relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              🎉 Розыгрыш Призов
            </h1>
            <nav className="hidden md:flex gap-6">
              <a href="#home" className="text-white/90 hover:text-white transition-colors font-medium drop-shadow">Главная</a>
              <a href="#rules" className="text-white/90 hover:text-white transition-colors font-medium drop-shadow">Правила</a>
              <a href="#contact" className="text-white/90 hover:text-white transition-colors font-medium drop-shadow">Контакты</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-20 relative z-10">
        <section id="home" className="text-center space-y-8 animate-fade-in min-h-[80vh] flex flex-col justify-center">
          <div className="space-y-4">
            <h2 className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-2xl leading-tight">
              Испытай Удачу!
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-lg">
              Введи свой счастливый номер и выиграй потрясающие призы 🎁
            </p>
          </div>

          <Card className="max-w-md mx-auto shadow-2xl border-2 border-white/30 bg-white/95 backdrop-blur-md animate-scale-in">
            <CardHeader className="bg-gradient-to-r from-red-500/20 via-pink-500/20 to-rose-500/20">
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
                className="text-lg h-14 text-center border-2 border-red-300 focus:border-red-500"
              />
              <Button
                onClick={checkNumber}
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 hover:opacity-90 transition-all hover:scale-105 text-white"
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

        <section id="rules" className="space-y-8">
          <h2 className="text-5xl font-bold text-center text-white drop-shadow-2xl">
            Правила Участия 📜
          </h2>
          <Card className="max-w-3xl mx-auto shadow-2xl border-2 border-white/30 bg-white/95 backdrop-blur-md">
            <CardContent className="p-8 space-y-6">
              {[
                { icon: 'CheckCircle2', text: 'Введи свой счастливый номер от 1 до 10000' },
                { icon: 'CheckCircle2', text: 'Если твой номер совпал с выигрышным - ты победил!' },
                { icon: 'CheckCircle2', text: 'Свяжись с нами в Telegram для получения приза' },
                { icon: 'CheckCircle2', text: 'Каждый участник может играть неограниченное количество раз' },
                { icon: 'CheckCircle2', text: 'Призы выдаются в течение 24 часов после победы' },
              ].map((rule, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <Icon name={rule.icon as any} className="text-red-600 mt-1 flex-shrink-0" size={24} />
                  <p className="text-lg text-foreground/80">{rule.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section id="contact" className="text-center space-y-8 pb-12">
          <h2 className="text-5xl font-bold text-white drop-shadow-2xl">
            Контакты 📱
          </h2>
          <Card className="max-w-md mx-auto shadow-2xl border-2 border-white/30 bg-white/95 backdrop-blur-md">
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

      <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 mt-20 relative z-10">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-white/80 drop-shadow">
            © 2026 Розыгрыш Призов. Удачи! 🍀
          </p>
        </div>
      </footer>
    </div>
  );
}
