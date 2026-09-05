import React, { useState, useEffect } from 'react';
import { quizService, QuizQuestion, QuizDiagnosticResponse } from '../../services/quizService';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  Award,
  ChevronRight,
  RotateCcw,
  Sparkles,
  BookOpen,
  Star,
  Target,
  ArrowRight,
  GraduationCap
} from 'lucide-react';

export const StudentQuizBotPage: React.FC = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [evaluating, setEvaluating] = useState<boolean>(false);
  const [result, setResult] = useState<QuizDiagnosticResponse | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      const res = await quizService.getTopics();
      if (res.success && res.data) {
        setTopics(res.data);
        if (res.data.length > 0) {
          startTopicQuiz(res.data[0]);
        }
      }
    } catch (err) {
      toast.error('Failed to load quiz topics');
    }
  };

  const startTopicQuiz = async (topic: string) => {
    setSelectedTopic(topic);
    setLoading(true);
    setResult(null);
    setUserAnswers({});
    setCurrentIndex(0);
    setShowExplanation(false);
    try {
      const res = await quizService.getQuestions(topic);
      if (res.success && res.data) {
        setQuestions(res.data);
      }
    } catch (err) {
      toast.error('Failed to load questions for topic');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    const q = questions[currentIndex];
    if (!q) return;
    setUserAnswers((prev) => ({ ...prev, [q.id]: optionIndex }));
  };

  const handleSubmitQuiz = async () => {
    if (Object.keys(userAnswers).length < questions.length) {
      toast.error('Please answer all questions before submitting your diagnostic!');
      return;
    }
    setEvaluating(true);
    try {
      const res = await quizService.evaluateQuiz(selectedTopic, userAnswers);
      if (res.success && res.data) {
        setResult(res.data);
        toast.success('Diagnostic evaluation complete!');
      }
    } catch (err) {
      toast.error('Error evaluating quiz diagnostic');
    } finally {
      setEvaluating(false);
    }
  };

  const currentQuestion = questions[currentIndex];
  const selectedOption = currentQuestion ? userAnswers[currentQuestion.id] : undefined;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="glass-card-premium p-8 border border-[#0a2540] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-br from-[#b58153]/20 via-[#ffebbf]/10 to-transparent blur-3xl rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffebbf]/10 border border-[#ffebbf]/30 rounded-full text-[#ffebbf] text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} /> AI Subject Diagnostics Bot
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight">
              Test Knowledge & Find Lagging Topics
            </h1>
            <p className="text-slate-300 text-sm font-medium max-w-2xl">
              Take interactive diagnostic quizzes across all academic & technical subjects. Discover your exact weak areas and book matching verified guest lectures!
            </p>
          </div>
        </div>
      </div>

      {/* Topic Selector Tabs */}
      <div className="flex flex-wrap gap-2 bg-[#010101] p-2 rounded-2xl border border-[#0a2540]">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => startTopicQuiz(t)}
            className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 ${
              selectedTopic === t
                ? 'bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] shadow-ns-gold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen size={15} /> {t}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="glass-card p-12 text-center text-slate-400 font-medium">
          Loading diagnostic questions for {selectedTopic}...
        </div>
      )}

      {/* Quiz Interface */}
      {!loading && !result && questions.length > 0 && (
        <div className="glass-card-premium p-8 border border-[#0a2540] space-y-6">
          {/* Progress Bar */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span className="text-[#ffebbf] uppercase">{currentQuestion.difficulty}</span>
          </div>
          <div className="w-full bg-[#010101] h-2 rounded-full overflow-hidden border border-[#0a2540]">
            <div
              className="bg-gradient-to-r from-[#b58153] to-[#ffebbf] h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Meta */}
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-[#0a2540] text-[#ffebbf] text-xs font-bold rounded-lg uppercase">
              {currentQuestion.subTopic}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">
            {currentQuestion.questionText}
          </h2>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl border text-left transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#0a2540] border-[#ffebbf] text-white shadow-md'
                      : 'bg-[#010101] border-[#0a2540] hover:border-[#b58153]/50 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border ${
                        isSelected
                          ? 'bg-[#ffebbf] text-[#010101] border-[#ffebbf]'
                          : 'border-slate-600 text-slate-400'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-sm font-semibold">{opt}</span>
                  </div>
                  {isSelected && <CheckCircle2 size={18} className="text-[#ffebbf]" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Toggle */}
          {selectedOption !== undefined && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowExplanation(!showExplanation)}
                className="text-xs font-bold text-[#ffebbf] hover:underline"
              >
                {showExplanation ? 'Hide Explanation' : '💡 View AI Explanation'}
              </button>
              {showExplanation && (
                <div className="mt-3 p-4 bg-[#090e18] border border-[#0a2540] rounded-xl text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-[#ffebbf]">Explanation: </span>
                  {currentQuestion.explanation}
                </div>
              )}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-[#0a2540]">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2.5 bg-[#010101] border border-[#0a2540] text-slate-300 hover:text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              Previous
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => {
                  setShowExplanation(false);
                  setCurrentIndex((prev) => prev + 1);
                }}
                className="btn-primary py-2.5 px-6 text-xs font-black uppercase tracking-wider"
              >
                Next Question <ChevronRight size={14} className="inline ml-1" />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={evaluating}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg hover:brightness-110 transition"
              >
                {evaluating ? 'Analyzing Diagnostics...' : 'Submit & View Diagnostics'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Diagnostic Evaluation Dashboard */}
      {result && (
        <div className="space-y-8 animate-scale-up">
          {/* Top Score Card */}
          <div className="glass-card-premium p-8 border border-[#0a2540] space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#0a2540] pb-6">
              <div>
                <span className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider">Diagnostic Report</span>
                <h2 className="text-3xl font-black text-white font-display mt-1">{result.topic}</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-3xl font-black text-white">{result.scorePercentage}%</div>
                  <div className="text-xs text-slate-400 font-medium">{result.correctAnswers} / {result.totalQuestions} Correct</div>
                </div>
                <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider ${
                  result.overallStatus === 'MASTERY'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : result.overallStatus === 'PROFICIENT'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                }`}>
                  {result.overallStatus}
                </div>
              </div>
            </div>

            {/* AI Recommendation Message */}
            <div className="p-5 bg-[#090e18] border border-[#0a2540] rounded-2xl flex items-start gap-4">
              <Brain size={24} className="text-[#ffebbf] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {result.aiRecommendationMessage}
              </p>
            </div>

            {/* Subtopic Performance Breakdown */}
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-bold text-white">Sub-Topic Mastery Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(result.subTopicScores).map(([subTopic, score]) => {
                  const isLagging = result.laggingSubTopics.includes(subTopic);
                  return (
                    <div key={subTopic} className="p-4 bg-[#010101] border border-[#0a2540] rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-white flex items-center gap-2">
                          {isLagging ? (
                            <AlertTriangle size={14} className="text-rose-400" />
                          ) : (
                            <CheckCircle2 size={14} className="text-emerald-400" />
                          )}
                          {subTopic}
                        </span>
                        <span className={isLagging ? 'text-rose-400' : 'text-emerald-400'}>{score}%</span>
                      </div>
                      <div className="w-full bg-[#0a2540] h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            isLagging ? 'bg-rose-500' : 'bg-emerald-400'
                          }`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      {isLagging && (
                        <div className="text-[11px] font-semibold text-rose-300/80">
                          ⚠️ Lagging area — Expert Guest Lecture recommended
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Retake Button */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => startTopicQuiz(selectedTopic)}
                className="px-5 py-2.5 bg-[#010101] border border-[#0a2540] hover:border-[#b58153] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition"
              >
                <RotateCcw size={14} /> Retake Quiz Diagnostic
              </button>
            </div>
          </div>

          {/* Recommended Verified Experts & Guest Lectures */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-white font-display">Recommended Experts for Lagging Topics</h3>
                <p className="text-xs text-slate-400 font-medium">Book a guest lecture or 1-on-1 session to master your weak subjects</p>
              </div>
              <Link to="/experts" className="text-xs font-bold text-[#ffebbf] hover:underline flex items-center gap-1">
                View All Experts <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {result.recommendedExperts.map((exp) => (
                <div key={exp.id} className="glass-card-hover p-6 border border-[#0a2540] space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] font-black text-base flex items-center justify-center shadow-md">
                          {exp.fullName.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-base">{exp.fullName}</h4>
                          <p className="text-xs text-slate-400 font-medium">{exp.currentDesignation} at {exp.organization}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-[#ffebbf]/10 px-2.5 py-1 rounded-full text-xs font-bold text-[#ffebbf]">
                        <Star size={12} className="fill-[#ffebbf]" /> {exp.rating || 4.9}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.areas?.slice(0, 3).map((area) => (
                        <span key={area} className="px-2.5 py-0.5 bg-[#010101] border border-[#0a2540] text-slate-300 text-[11px] font-semibold rounded-md">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#0a2540] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Session Fee</div>
                      <div className="text-sm font-black text-[#ffebbf]">₹{exp.sessionFee?.toString() || '2,500'}</div>
                    </div>
                    <Link
                      to={`/experts/${exp.id}`}
                      className="btn-primary py-2 px-4 text-xs font-black uppercase tracking-wider"
                    >
                      Book Lecture
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
