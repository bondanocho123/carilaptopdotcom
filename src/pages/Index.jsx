import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, Laptop, DollarSign, Battery, Gauge, Feather, CheckCircle2 } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

const Index = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [usage, setUsage] = useState(null);
  const [priority, setPriority] = useState(null);
  const [budget, setBudget] = useState(null);

  const usageOptions = [
    { id: "kuliah", label: "Kuliah", icon: "📚", desc: "Untuk tugas dan belajar" },
    { id: "kerja", label: "Kerja kantoran", icon: "💼", desc: "Produktivitas sehari-hari" },
    { id: "desain", label: "Desain grafis", icon: "🎨", desc: "Photoshop, Illustrator" },
    { id: "gaming", label: "Gaming", icon: "🎮", desc: "Game modern lancar" },
    { id: "editing", label: "Editing video", icon: "🎬", desc: "Premiere, After Effects" },
  ];

  const priorityOptions = [
    { id: "harga_murah", label: "Harga murah", icon: DollarSign, desc: "Budget terbatas" },
    { id: "performa", label: "Performa", icon: Gauge, desc: "Kecepatan maksimal" },
    { id: "baterai", label: "Baterai", icon: Battery, desc: "Tahan lama" },
    { id: "ringan", label: "Ringan", icon: Feather, desc: "Mudah dibawa" },
  ];

  const budgetOptions = [
    { id: "low", label: "< 5 juta", desc: "Budget hemat" },
    { id: "mid", label: "5–10 juta", desc: "Budget sedang" },
    { id: "high", label: "> 10 juta", desc: "Budget fleksibel" },
  ];

  const canProceed = () => {
    if (step === 1) return usage !== null;
    if (step === 2) return priority !== null;
    if (step === 3) return budget !== null;
    return false;
  };

  const handleNext = () => {
    if (canProceed() && step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleViewResults = () => {
    if (usage && priority && budget) {
      navigate(`/results?usage=${usage}&priority=${priority}&budget=${budget}`);
    }
  };

  return (
    <div className="relative min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <NavBar />
      <AnimatedBackground />
      <div className="w-full max-w-4xl relative z-10 p-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
            <Laptop className="w-8 h-8 text-white" />
            
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Temukan Laptop Ideal
          </h1>
          <p className="text-muted-foreground text-lg">
            Jawab 3 pertanyaan sederhana untuk rekomendasi terbaik
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12 animate-slide-in">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all duration-300 ${
                  step >= num
                    ? "bg-gradient-to-br from-primary to-accent text-white shadow-lg scale-110"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > num ? <CheckCircle2 className="w-5 h-5" /> : num}
              </div>
              {num < 3 && (
                <div
                  className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                    step > num ? "bg-gradient-to-r from-primary to-accent" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card className="p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 border-border/50 animate-scale-in">
          {/* Step 1: Usage */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Untuk apa laptop digunakan?</h2>
                <p className="text-muted-foreground">Pilih kebutuhan utama Anda</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {usageOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setUsage(option.id)}
                    className={`p-6 rounded-xl border-2 text-left transition-all duration-300 hover:scale-105 ${
                      usage === option.id
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "border-border hover:border-primary/50 bg-card"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{option.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{option.label}</h3>
                        <p className="text-sm text-muted-foreground">{option.desc}</p>
                      </div>
                      {usage === option.id && (
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Priority */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Yang paling penting?</h2>
                <p className="text-muted-foreground">Tentukan prioritas utama Anda</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {priorityOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setPriority(option.id)}
                      className={`p-6 rounded-xl border-2 text-left transition-all duration-300 hover:scale-105 ${
                        priority === option.id
                          ? "border-primary bg-primary/5 shadow-lg"
                          : "border-border hover:border-primary/50 bg-card"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-lg ${
                            priority === option.id
                              ? "bg-gradient-to-br from-primary to-accent text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{option.label}</h3>
                          <p className="text-sm text-muted-foreground">{option.desc}</p>
                        </div>
                        {priority === option.id && (
                          <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Berapa budget Anda?</h2>
                <p className="text-muted-foreground">Pilih kisaran harga yang sesuai</p>
              </div>
              <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                {budgetOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setBudget(option.id)}
                    className={`p-6 rounded-xl border-2 text-left transition-all duration-300 hover:scale-105 ${
                      budget === option.id
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "border-border hover:border-primary/50 bg-card"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-xl mb-1">{option.label}</h3>
                        <p className="text-sm text-muted-foreground">{option.desc}</p>
                      </div>
                      {budget === option.id && (
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Result Summary */}
              {budget && (
                <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 animate-scale-in">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Pilihan Anda:
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Kebutuhan:</span>{" "}
                      <span className="text-muted-foreground">
                        {usageOptions.find((o) => o.id === usage)?.label}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Prioritas:</span>{" "}
                      <span className="text-muted-foreground">
                        {priorityOptions.find((o) => o.id === priority)?.label}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Budget:</span>{" "}
                      <span className="text-muted-foreground">
                        {budgetOptions.find((o) => o.id === budget)?.label}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button variant="outline" onClick={handleBack} disabled={step === 1} className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Kembali
            </Button>

            {step < 3 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0"
              >
                Lanjut
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleViewResults}
                disabled={!budget}
                className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0"
              >
                Lihat Rekomendasi
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </Card>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;
