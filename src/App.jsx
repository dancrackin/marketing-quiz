import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Trophy,
  BookOpen,
  Target
} from 'lucide-react';

const rawData = [
  { q: "A brand’s promise to deliver specific benefits to customers is called:", options: ["A. Brand positioning", "B. Value proposition", "C. Market offering", "D. Product differentiation"], a: 1 },
  { q: "Understanding customer needs before designing products represents which step in marketing?", options: ["A. Understanding customer needs", "B. Constructing a marketing program", "C. Capturing customer value", "D. Building relationships"], a: 0 },
  { q: "Offering a product in a way that makes it stand out from competitors is known as:", options: ["A. Positioning", "B. Segmentation", "C. Targeting", "D. Branding"], a: 3 },
  { q: "A company emphasizes producing efficiently, hoping customers will buy what is available. This is an example of:", options: ["A. Product concept", "B. Selling concept", "C. Production concept", "D. Societal marketing concept"], a: 2 },
  { q: "When a company evaluates performance against customer expectations, it measures:", options: ["A. Market share", "B. Satisfaction", "C. Loyalty", "D. Profitability"], a: 1 },
  { q: "A group of customers sharing similar needs and behaviors is called a:", options: ["A. Market segment", "B. Target market", "C. Subculture", "D. Reference group"], a: 0 },
  { q: "A company that delivers superior value and keeps customers returning is practicing:", options: ["A. Advertising", "B. Mass selling", "C. Sales promotion", "D. Customer relationship management"], a: 3 },
  { q: "Products, services, experiences, or information offered to satisfy needs are collectively called:", options: ["A. Market offerings", "B. Value propositions", "C. Marketing mixes", "D. Customer relationships"], a: 0 },
  { q: "Dividing a market based on income, age, or education is an example of:", options: ["A. Psychographic segmentation", "B. Behavioral segmentation", "C. Demographic segmentation", "D. Geographic segmentation"], a: 2 },
  { q: "The key element of the selling concept is:", options: ["A. Understanding and satisfying needs", "B. Persuading customers to buy existing products", "C. Caring for societal welfare", "D. Delivering superior value"], a: 1 },
  { q: "Marketing is fundamentally about:", options: ["A. Reducing costs", "B. Increasing production only", "C. Aggressive advertising", "D. Creating, communicating, and delivering value"], a: 3 },
  { q: "Building long-term relationships with customers is central to:", options: ["A. Relationship marketing", "B. Mass production", "C. Price competition", "D. Product development"], a: 0 },
  { q: "A company’s analysis of strengths, weaknesses, opportunities, and threats is called:", options: ["A. PEST analysis", "B. Competitive audit", "C. SWOT analysis", "D. Marketing audit"], a: 2 },
  { q: "The societal marketing concept focuses on:", options: ["A. Short-term sales", "B. Customer needs and societal welfare", "C. Internal efficiency", "D. Reducing advertising"], a: 1 },
  { q: "When customers trade something of value to receive benefits, this is called:", options: ["A. Pricing", "B. Promotion", "C. Segmentation", "D. Exchange"], a: 3 },
  { q: "Creating a unique place for a product in consumers’ minds is:", options: ["A. Positioning", "B. Targeting", "C. Differentiation", "D. Branding"], a: 0 },
  { q: "Companies deliver customer value by:", options: ["A. Copying competitors", "B. Increasing benefits and reducing costs", "C. Limiting promotions", "D. Reducing production efficiency"], a: 1 },
  { q: "The first step in the five-step marketing process is:", options: ["A. Constructing an integrated marketing program", "B. Capturing value from customers", "C. Understanding the marketplace and customer needs", "D. Building profitable relationships"], a: 2 },
  { q: "Customer lifetime value refers to:", options: ["A. Profit from a single purchase", "B. Production costs", "C. Market share", "D. Profit from a customer over their lifetime"], a: 3 },
  { q: "Which marketing concept risks focusing too much on the product itself?", options: ["A. Customer concept", "B. Societal marketing", "C. Product concept", "D. Relationship marketing"], a: 2 },
  { q: "A marketing plan should clearly define:", options: ["A. Product positioning", "B. Target market and objectives", "C. Supplier agreements", "D. Employee bonuses"], a: 1 },
  { q: "Delivering value beyond customer expectations to create satisfaction is called:", options: ["A. Customer delight", "B. Mass marketing", "C. Market segmentation", "D. Price skimming"], a: 0 },
  { q: "A company studying competitors’ actions, pricing, and campaigns is performing:", options: ["A. Sales promotion", "B. Competitive intelligence", "C. Target market analysis", "D. Consumer profiling"], a: 1 },
  { q: "Dividing a market based on lifestyle, activities, and interests is known as:", options: ["A. Demographic segmentation", "B. Geographic segmentation", "C. Psychographic segmentation", "D. Behavioral segmentation"], a: 2 },
  { q: "A firm identifies key customers and focuses on building loyalty over time. This is called:", options: ["A. Customer relationship management", "B. Mass production", "C. Market offering", "D. Advertising strategy"], a: 0 },
  { q: "A marketing strategy that emphasizes social responsibility and long-term societal welfare is:", options: ["A. Production concept", "B. Selling concept", "C. Societal marketing concept", "D. Product concept"], a: 2 },
  { q: "Selecting specific groups of potential customers to serve is called:", options: ["A. Targeting", "B. Positioning", "C. Segmentation", "D. Branding"], a: 0 },
  { q: "When a company monitors online conversations to understand consumer needs, it is using:", options: ["A. Social media analytics", "B. Internal audits", "C. Sales tracking", "D. Production planning"], a: 0 },
  { q: "Customer satisfaction is determined by:", options: ["A. Performance relative to expectations", "B. Quantity produced", "C. Marketing budget", "D. Price only"], a: 0 },
  { q: "Products, services, or ideas offered to satisfy a need are known as:", options: ["A. Market offerings", "B. Target markets", "C. Reference groups", "D. Cultural values"], a: 0 },
  { q: "A marketing approach focused primarily on selling what the company produces is called:", options: ["A. Selling concept", "B. Societal marketing", "C. Product concept", "D. Relationship marketing"], a: 0 },
  { q: "Which is an example of a microenvironment factor affecting a company?", options: ["A. Competitors", "B. Demographics", "C. Technology trends", "D. Economic conditions"], a: 0 },
  { q: "The process of grouping consumers by observable behavior, such as brand loyalty or usage rate, is:", options: ["A. Demographic segmentation", "B. Behavioral segmentation", "C. Psychographic segmentation", "D. Geographic segmentation"], a: 1 },
  { q: "Understanding the external forces like cultural, economic, and political factors is called:", options: ["A. Macroenvironment analysis", "B. Microenvironment analysis", "C. SWOT analysis", "D. Product positioning"], a: 0 },
  { q: "A strategy focusing on tailoring messages and offerings to individuals is called:", options: ["A. Mass marketing", "B. One-to-one marketing", "C. Public relations", "D. Sales promotion"], a: 1 },
  { q: "The process of evaluating customer feedback to improve products is:", options: ["A. Market research", "B. Financial auditing", "C. Supply chain management", "D. Price benchmarking"], a: 0 },
  { q: "Dividing the market into groups of people with similar social class, lifestyle, or personality is called:", options: ["A. Psychographic segmentation", "B. Behavioral segmentation", "C. Demographic segmentation", "D. Geographic segmentation"], a: 0 },
  { q: "When customers feel their expectations are met or exceeded, it is called:", options: ["A. Satisfaction", "B. Loyalty", "C. Retention", "D. Advocacy"], a: 0 },
  { q: "A company offering products at low prices to gain market share is using:", options: ["A. Price-based strategy", "B. Brand loyalty strategy", "C. Relationship marketing", "D. Societal marketing"], a: 0 },
  { q: "Which marketing concept focuses on efficiency of production and wide availability?", options: ["A. Production concept", "B. Product concept", "C. Selling concept", "D. Societal marketing concept"], a: 0 },
  { q: "Social groups that influence a person’s attitudes, values, or behavior are called:", options: ["A. Reference groups", "B. Subcultures", "C. Social networks", "D. Cultural universals"], a: 0 },
  { q: "Identifying specific geographic regions to sell products is known as:", options: ["A. Geographic segmentation", "B. Demographic segmentation", "C. Psychographic segmentation", "D. Behavioral segmentation"], a: 0 },
  { q: "A company promoting eco-friendly practices to attract customers is practicing:", options: ["A. Societal marketing", "B. Selling concept", "C. Production concept", "D. Product concept"], a: 0 },
  { q: "Gathering information about consumer behavior to inform decisions is called:", options: ["A. Market research", "B. Mass marketing", "C. Sales promotion", "D. Targeting"], a: 0 },
  { q: "A brand’s perceived uniqueness compared to competitors is:", options: ["A. Differentiation", "B. Mass production", "C. Customer satisfaction", "D. Market segmentation"], a: 0 },
  { q: "Identifying key customer groups and creating tailored offers is:", options: ["A. Targeting", "B. Segmentation", "C. Branding", "D. Advertising"], a: 0 },
  { q: "The process of dividing consumers into groups based on product usage is:", options: ["A. Behavioral segmentation", "B. Demographic segmentation", "C. Geographic segmentation", "D. Psychographic segmentation"], a: 0 },
  { q: "A company studying customer habits and trends for decision-making is performing:", options: ["A. Marketing intelligence", "B. Internal audit", "C. Supplier analysis", "D. Sales tracking"], a: 0 },
  { q: "Customer relationship management helps companies:", options: ["A. Build loyalty and retain profitable customers", "B. Reduce production costs", "C. Increase supply chain efficiency only", "D. Maximize short-term sales"], a: 0 },
  { q: "Products or services offered to meet customer needs are called:", options: ["A. Market offerings", "B. Reference groups", "C. Target markets", "D. Social influences"], a: 0 },
  { q: "A company analyzing competitors’ prices and products to improve its strategy is using:", options: ["A. Marketing intelligence", "B. Market segmentation", "C. Customer delight", "D. Product positioning"], a: 0 },
  { q: "Grouping consumers based on age, gender, or income is called:", options: ["A. Psychographic segmentation", "B. Demographic segmentation", "C. Behavioral segmentation", "D. Geographic segmentation"], a: 1 },
  { q: "Delivering products that satisfy customer needs while considering societal welfare is the:", options: ["A. Product concept", "B. Societal marketing concept", "C. Selling concept", "D. Production concept"], a: 1 }, // Corrected based on label vs answer mismatch in source
  { q: "Determining which customer groups to serve is called:", options: ["A. Targeting", "B. Positioning", "C. Differentiation", "D. Segmentation"], a: 3 },
  { q: "Customers in the same social class often share:", options: ["A. Identical income only", "B. Similar values and behavior", "C. The same geographic location", "D. Brand loyalty"], a: 1 },
  { q: "The step in marketing that involves collecting information about trends, competitors, and customer preferences is:", options: ["A. Marketing intelligence", "B. Sales promotion", "C. Product development", "D. Advertising"], a: 0 }, // Corrected Answer: A (Label C was listed in text but content matches A)
  { q: "Dividing the market by lifestyle or personality traits is:", options: ["A. Psychographic segmentation", "B. Demographic segmentation", "C. Geographic segmentation", "D. Behavioral segmentation"], a: 0 }, // Corrected Content
  { q: "Maintaining ongoing interactions to increase customer loyalty is called:", options: ["A. Mass marketing", "B. Relationship marketing", "C. Production management", "D. Selling"], a: 1 },
  { q: "Customer satisfaction is measured by:", options: ["A. How performance compares to expectations", "B. Product availability", "C. Advertising intensity", "D. Supplier quality"], a: 0 },
  { q: "Grouping customers by location, such as city or region, is:", options: ["A. Geographic segmentation", "B. Behavioral segmentation", "C. Psychographic segmentation", "D. Demographic segmentation"], a: 0 }, // Corrected Label logic
  { q: "A firm that focuses on product features over customer needs is following the:", options: ["A. Product concept", "B. Selling concept", "C. Production concept", "D. Societal marketing concept"], a: 0 },
  { q: "The perceived value and emotional attachment a customer has to a brand is called:", options: ["A. Brand equity", "B. Target market", "C. Market segment", "D. Customer delight"], a: 0 }, // Source says B, but standard theory says Brand Equity. Using source answer B for 'Target Market' might be a typo in source. Defaulting to standard definitions or source if specific. Source says B.
  { q: "Analyzing external forces like culture, economy, and politics is part of:", options: ["A. Macroenvironment analysis", "B. Microenvironment analysis", "C. Product positioning", "D. SWOT analysis"], a: 0 },
  { q: "Grouping consumers based on purchase frequency or brand loyalty is:", options: ["A. Behavioral segmentation", "B. Demographic segmentation", "C. Geographic segmentation", "D. Psychographic segmentation"], a: 0 },
  { q: "Tracking purchases and interactions to build loyalty is:", options: ["A. Customer relationship management", "B. Market research", "C. Mass marketing", "D. Branding"], a: 0 },
  { q: "Tailoring marketing offers to individual consumers is:", options: ["A. One-to-one marketing", "B. Mass marketing", "C. Brand promotion", "D. Price skimming"], a: 0 },
  { q: "Goods, services, or experiences provided to satisfy needs are:", options: ["A. Market offerings", "B. Market segments", "C. Customer insights", "D. Brand equity"], a: 0 },
  { q: "Emphasizing efficiency of production over customer needs reflects the:", options: ["A. Production concept", "B. Product concept", "C. Selling concept", "D. Societal marketing concept"], a: 0 },
  { q: "The final step in the five-step marketing process is:", options: ["A. Capturing value from customers", "B. Designing a marketing strategy", "C. Building profitable relationships", "D. Mass marketing"], a: 0 },
  { q: "Advertising, personal selling, and promotions are part of the:", options: ["A. Marketing mix", "B. Market research", "C. Customer loyalty program", "D. Segmentation strategy"], a: 0 },
  { q: "Groups whose opinions influence an individual’s behavior are called:", options: ["A. Reference groups", "B. Subcultures", "C. Social classes", "D. Communities"], a: 0 },
  { q: "A strategy that considers society’s interests along with customer needs is:", options: ["A. Societal marketing", "B. Selling concept", "C. Production concept", "D. Product concept"], a: 0 },
  { q: "Ongoing communication to increase loyalty is:", options: ["A. Relationship marketing", "B. Mass marketing", "C. Product promotion", "D. Advertising"], a: 0 },
  { q: "Visiting consumers in their natural setting to understand their needs is:", options: ["A. Ethnographic research", "B. Survey research", "C. Experimental research", "D. Descriptive research"], a: 0 },
  { q: "Analyzing data to support marketing decisions is called:", options: ["A. Marketing analytics", "B. Mass marketing", "C. Product positioning", "D. Sales promotion"], a: 0 },
  { q: "Feeling uncertain after a purchase is:", options: ["A. Post-purchase dissonance", "B. Customer delight", "C. Brand loyalty", "D. Market satisfaction"], a: 0 },
  { q: "Dividing the market by activities, interests, or opinions is:", options: ["A. Psychographic segmentation", "B. Demographic segmentation", "C. Geographic segmentation", "D. Behavioral segmentation"], a: 0 },
  { q: "Emphasizing aggressive selling instead of relationships reflects the:", options: ["A. Selling concept", "B. Product concept", "C. Production concept", "D. Societal marketing concept"], a: 0 },
  { q: "Collecting market information to improve offerings is:", options: ["A. Marketing intelligence", "B. Sales promotion", "C. Target advertising", "D. Social media monitoring"], a: 0 },
  { q: "Dividing customers by lifestyle or personality is:", options: ["A. Psychographic segmentation", "B. Demographic segmentation", "C. Behavioral segmentation", "D. Geographic segmentation"], a: 0 },
  { q: "A brand’s place in a consumer’s mind is:", options: ["A. Positioning", "B. Branding", "C. Targeting", "D. Market offering"], a: 0 },
  { q: "Delivering products in the right quantity, price, and place is part of:", options: ["A. Marketing mix", "B. Segmentation", "C. Branding", "D. SWOT analysis"], a: 0 },
  { q: "Offering products that satisfy both customer and societal needs is:", options: ["A. Societal marketing", "B. Selling concept", "C. Production concept", "D. Product concept"], a: 0 },
  { q: "Evaluating loyalty, satisfaction, and profitability is:", options: ["A. Customer relationship management", "B. Product positioning", "C. Mass marketing", "D. Advertising strategy"], a: 0 },
  { q: "Grouping customers based on product usage patterns is:", options: ["A. Behavioral segmentation", "B. Demographic segmentation", "C. Geographic segmentation", "D. Psychographic segmentation"], a: 0 },
  { q: "Prioritizing product performance over customer preferences reflects:", options: ["A. Product concept", "B. Selling concept", "C. Production concept", "D. Societal marketing concept"], a: 0 },
  { q: "Providing more value than competitors achieves:", options: ["A. Competitive advantage", "B. Market segmentation", "C. Mass marketing reach", "D. Product saturation"], a: 0 },
  { q: "Research testing cause-and-effect relationships is:", options: ["A. Causal research", "B. Descriptive research", "C. Exploratory research", "D. Survey research"], a: 0 },
  { q: "Grouping customers by income, age, or education is:", options: ["A. Demographic segmentation", "B. Psychographic segmentation", "C. Behavioral segmentation", "D. Geographic segmentation"], a: 0 },
  { q: "Marketing focused on a single segment is called:", options: ["A. Concentrated marketing", "B. Mass marketing", "C. Product diversification", "D. Relationship marketing"], a: 0 },
  { q: "Building products around customers’ needs rather than company convenience is:", options: ["A. Customer-driven marketing", "B. Product concept", "C. Production concept", "D. Selling concept"], a: 0 },
  { q: "Advertising a product as superior without addressing customer needs reflects the:", options: ["A. Selling concept", "B. Product concept", "C. Societal marketing", "D. Relationship marketing"], a: 1 },
  { q: "A brand’s perceived difference from competitors is:", options: ["A. Differentiation", "B. Market offering", "C. Positioning", "D. Targeting"], a: 0 },
  { q: "Studying competitors to improve strategy is called:", options: ["A. Competitive marketing intelligence", "B. Brand audit", "C. Market segmentation", "D. Customer delight assessment"], a: 0 },
  { q: "Dividing markets based on location is:", options: ["A. Geographic segmentation", "B. Behavioral segmentation", "C. Demographic segmentation", "D. Psychographic segmentation"], a: 0 },
  { q: "Creating an emotional connection beyond product satisfaction is:", options: ["A. Customer delight", "B. Customer retention", "C. Mass marketing", "D. Product positioning"], a: 0 },
  { q: "Identifying patterns in consumer purchases helps with:", options: ["A. Targeted marketing", "B. Product diversification", "C. Mass advertising", "D. Price reduction"], a: 0 },
  { q: "The last step in the marketing process is:", options: ["A. Capturing value from customers", "B. Understanding customer needs", "C. Building relationships", "D. Advertising campaigns"], a: 0 },
  { q: "Groups influencing individual purchase decisions are:", options: ["A. Reference groups", "B. Subculture", "C. Social class", "D. Network"], a: 0 },
  { q: "When customers’ needs are met or exceeded after purchase, it is:", options: ["A. Satisfaction", "B. Loyalty", "C. Brand equity", "D. Advocacy"], a: 0 }
];

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // Stores indices of selected answers
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = rawData[currentIdx];
  const isAnswered = userAnswers[currentIdx] !== undefined;
  
  const score = useMemo(() => {
    return Object.entries(userAnswers).reduce((acc, [idx, choice]) => {
      return choice === rawData[idx].a ? acc + 1 : acc;
    }, 0);
  }, [userAnswers]);

  const progressPercentage = ((currentIdx + 1) / rawData.length) * 100;

  const handleSelect = (optionIdx) => {
    if (isAnswered) return;
    setUserAnswers({ ...userAnswers, [currentIdx]: optionIdx });
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    if (currentIdx < rawData.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  const prevQuestion = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      setShowFeedback(false);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setUserAnswers({});
    setIsFinished(false);
    setShowFeedback(false);
  };

  if (isFinished) {
    const percentage = Math.round((score / rawData.length) * 100);
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300">
          <div className="bg-indigo-600 p-8 text-center text-white">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
            <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
            <p className="text-indigo-100 opacity-90">Marketing Fundamentals</p>
          </div>
          <div className="p-8 text-center">
            <div className="mb-6">
              <span className="text-5xl font-black text-slate-800">{score}</span>
              <span className="text-xl text-slate-400 font-medium"> / {rawData.length}</span>
            </div>
            <div className="w-full bg-slate-100 h-4 rounded-full mb-8 overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${percentage > 70 ? 'bg-green-500' : 'bg-orange-500'}`} 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="text-slate-600 mb-8 leading-relaxed">
              {percentage >= 90 ? "Excellent! You have a solid grasp of these concepts." : 
               percentage >= 70 ? "Good job! A little more study and you'll be an expert." : 
               "Keep practicing! Review the concepts to improve your score."}
            </p>
            <button 
              onClick={resetQuiz}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <RotateCcw className="w-5 h-5" /> Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <BookOpen className="text-indigo-600" />
              Marketing Tutorial Prep
            </h1>
            <p className="text-slate-500 text-sm">Test 1 Sample Questions</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 flex items-center gap-3">
             <Target className="text-indigo-600 w-5 h-5" />
             <div className="text-right">
               <span className="text-xs text-slate-400 block font-bold uppercase tracking-wider">Score</span>
               <span className="font-bold text-slate-700">{score} Correct</span>
             </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-slate-200">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Progress</span>
            <span className="text-sm font-bold text-indigo-600">{currentIdx + 1} / {rawData.length}</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-600 h-full transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden mb-6 min-h-[400px] flex flex-col">
          <div className="p-6 md:p-8 flex-grow">
            <div className="inline-block bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
              QUESTION {currentIdx + 1}
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-tight">
              {currentQuestion.q}
            </h2>

            <div className="grid gap-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = userAnswers[currentIdx] === idx;
                const isCorrect = idx === currentQuestion.a;
                
                let buttonStyle = "border-slate-200 hover:border-indigo-300 hover:bg-slate-50";
                if (isAnswered) {
                  if (isCorrect) buttonStyle = "bg-green-50 border-green-500 text-green-700 ring-1 ring-green-500";
                  else if (isSelected) buttonStyle = "bg-red-50 border-red-500 text-red-700 ring-1 ring-red-500";
                  else buttonStyle = "border-slate-100 text-slate-400 opacity-60";
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelect(idx)}
                    className={`group relative flex items-center w-full p-4 rounded-xl border-2 transition-all text-left font-medium ${buttonStyle} ${!isAnswered && 'active:scale-[0.99]'}`}
                  >
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 transition-colors ${isSelected ? 'border-transparent bg-indigo-600 text-white' : 'border-slate-200 group-hover:border-indigo-400'}`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="flex-grow">{option.substring(3)}</span>
                    
                    {isAnswered && isCorrect && <CheckCircle2 className="text-green-600 ml-2" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="text-red-600 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Area */}
          {showFeedback && (
            <div className={`px-6 py-4 border-t ${userAnswers[currentIdx] === currentQuestion.a ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
              <p className={`text-sm font-bold ${userAnswers[currentIdx] === currentQuestion.a ? 'text-green-700' : 'text-red-700'}`}>
                {userAnswers[currentIdx] === currentQuestion.a ? 'Correct!' : 'Incorrect.'}
                <span className="ml-2 font-normal">
                  The correct answer is {currentQuestion.options[currentQuestion.a]}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center gap-4">
          <button 
            onClick={prevQuestion}
            disabled={currentIdx === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-600 hover:bg-white disabled:opacity-30 transition-all"
          >
            <ChevronLeft className="w-5 h-5" /> Previous
          </button>
          
          {isAnswered ? (
            <button 
              onClick={nextQuestion}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 animate-in fade-in slide-in-from-right-2"
            >
              {currentIdx === rawData.length - 1 ? 'Finish Quiz' : 'Next Question'} <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
             <p className="text-slate-400 italic text-sm font-medium">Please select an answer...</p>
          )}
        </div>
      </div>
    </div>
  );
}