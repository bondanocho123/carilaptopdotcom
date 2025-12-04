import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // kalau pakai React Router
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Send, Sparkles, MessageCircle, ArrowLeft, Heart } from "lucide-react";
import { LaptopApi } from "../api/laptop.api";


const FeedBack = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        nama: "",
        email: "",
        pesan: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.nama || !form.email || !form.pesan) {
            alert("Semua kolom wajib diisi ya!");
            return;
        }

        setLoading(true);
        try {

            LaptopApi.post_kritik_saran(form)
                .then((res) => {
                    setLoading(false)
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => { setLoading(false)  });

            if (data.success) {
                alert(`Terima kasih banyak, ${form.nama}! ❤️ Kritik & saran kamu sudah kami terima!`);
                setForm({ nama: "", email: "", pesan: "" });
            } else {
                throw new Error(data.message || "Gagal mengirim");
            }
        } catch (err) {
            alert("Gagal mengirim. Coba lagi dalam beberapa detik ya 😢");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">

                {/* Tombol Back + Header */}
                <div className="flex items-center justify-between mb-10">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/")} // ← KEMBALI KE HALAMAN SEBELUMNYA
                        className="group flex items-center gap-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Kembali</span>
                    </Button>

                    <div className="text-right">
                        <div className="inline-flex items-center gap.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg">
                            <MessageCircle className="w-6 h-6" />
                            Kritik & Saran
                        </div>
                    </div>
                </div>

                {/* Judul */}
                <div className="text-center mb-10 -mt-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Bantu Kami Jadi Lebih Baik
                    </h1>
                    <p className="text-lg text-gray-600 max-w-md mx-auto">
                        Setiap masukan dari kamu sangat berarti buat pengembangan <strong>CariLaptop.com</strong>
                    </p>
                </div>

                {/* Form Card */}
                <Card className="backdrop-blur-xl bg-white/90 border border-white/50 shadow-2xl rounded-3xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 h-3"></div>
                    
                    <form onSubmit={handleSubmit} className="p-8 space-y-7">

                        {/* Nama */}
                        <div className="space-y-2">
                            <Label htmlFor="nama" className="text-base font-medium text-gray-700">
                                Nama Kamu
                            </Label>
                            <Input
                                id="nama"
                                placeholder="Siapa kamu? 😊"
                                value={form.nama}
                                onChange={(e) => setForm({...form, nama: e.target.value})}
                                className="h-14 text-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-base font-medium text-gray-700">
                                Email (biar kami bisa balas)
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="nama@contoh.com"
                                value={form.email}
                                onChange={(e) => setForm({...form, email: e.target.value})}
                                className="h-14 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                                required
                            />
                        </div>

                        {/* Pesan */}
                        <div className="space-y-2">
                            <Label htmlFor="pesan" className="text-base font-medium text-gray-700">
                                Pesan / Kritik / Saran
                            </Label>
                            <Textarea
                                id="pesan"
                                placeholder="Ceritain apa yang ingin kamu sampaikan... (fitur baru, bug, tampilan, dll)"
                                rows={7}
                                value={form.pesan}
                                onChange={(e) => setForm({...form, pesan: e.target.value})}
                                className="text-lg resize-none border-2 border-gray-200 focus:border-gradient-to-r focus:from-blue-500 focus:to-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300"
                                required
                            />
                        </div>

                        {/* Tombol Kirim */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-16 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-4"
                        >
                            {loading ? (
                                <>
                                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Mengirim...
                                </>
                            ) : (
                                <>
                                    <Send className="w-6 h-6" />
                                    Kirim Kritik & Saran
                                    <Sparkles className="w-6 h-6" />
                                </>
                            )}
                        </Button>

                        <div className="text-center pt-4">
                            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                                Kami membaca <span className="font-bold text-purple-600">SETIAP</span> pesan yang masuk
                                <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
                            </p>
                        </div>
                    </form>
                </Card>

                {/* Footer kecil */}
                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm">
                        Made with <Heart className="inline w-4 h-4 text-red-500 fill-red-500" /> by tim <span className="font-bold text-purple-600">CariLaptop.com</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FeedBack;