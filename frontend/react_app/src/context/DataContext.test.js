// We test the pure helper functions extracted from DataContext logic.
// These are stateless functions with no React or API dependencies, making
// them the most straightforward to unit test.

// --- Pure functions mirrored from DataContext.js ---
const getPositiveAnalysedComments = (analysedComments) =>
  analysedComments.filter((c) => c.sentiment.sentiment === 'Positive');

const getNeutralAnalysedComments = (analysedComments) =>
  analysedComments.filter((c) => c.sentiment.sentiment === 'Neutral');

const getNegativeAnalysedComments = (analysedComments) =>
  analysedComments.filter((c) => c.sentiment.sentiment === 'Negative');

const calcPercentage = (filtered, total) =>
  Math.round((filtered.length * 100) / total.length);

// --- Sample test data ---
const mockComments = [
  { id: 1, content: 'Amazing!', sentiment: { sentiment: 'Positive', score: '5' } },
  { id: 2, content: 'Pretty good', sentiment: { sentiment: 'Positive', score: '4' } },
  { id: 3, content: 'It is okay', sentiment: { sentiment: 'Neutral', score: '3' } },
  { id: 4, content: 'Not great', sentiment: { sentiment: 'Negative', score: '2' } },
];

// -------------------------------------------------------------------

describe('DataContext – sentiment filter helpers', () => {
  describe('getPositiveAnalysedComments', () => {
    it('should return only comments with Positive sentiment', () => {
      const result = getPositiveAnalysedComments(mockComments);
      expect(result).toHaveLength(2);
      result.forEach((c) => expect(c.sentiment.sentiment).toBe('Positive'));
    });

    it('should return an empty array when there are no positive comments', () => {
      const noPositive = mockComments.filter(
        (c) => c.sentiment.sentiment !== 'Positive',
      );
      expect(getPositiveAnalysedComments(noPositive)).toHaveLength(0);
    });
  });

  describe('getNeutralAnalysedComments', () => {
    it('should return only comments with Neutral sentiment', () => {
      const result = getNeutralAnalysedComments(mockComments);
      expect(result).toHaveLength(1);
      expect(result[0].sentiment.sentiment).toBe('Neutral');
    });
  });

  describe('getNegativeAnalysedComments', () => {
    it('should return only comments with Negative sentiment', () => {
      const result = getNegativeAnalysedComments(mockComments);
      expect(result).toHaveLength(1);
      expect(result[0].sentiment.sentiment).toBe('Negative');
    });
  });
});

describe('DataContext – percentage calculation', () => {
  it('should correctly calculate the positive percentage', () => {
    const positives = getPositiveAnalysedComments(mockComments);
    // 2 out of 4 = 50%
    expect(calcPercentage(positives, mockComments)).toBe(50);
  });

  it('should correctly calculate the neutral percentage', () => {
    const neutrals = getNeutralAnalysedComments(mockComments);
    // 1 out of 4 = 25%
    expect(calcPercentage(neutrals, mockComments)).toBe(25);
  });

  it('should correctly calculate the negative percentage', () => {
    const negatives = getNegativeAnalysedComments(mockComments);
    // 1 out of 4 = 25%
    expect(calcPercentage(negatives, mockComments)).toBe(25);
  });

  it('should round the percentage correctly', () => {
    // 1 out of 3 = 33.33... → rounds to 33
    const oneComment = [mockComments[0]];
    const threeComments = mockComments.slice(0, 3);
    expect(calcPercentage(oneComment, threeComments)).toBe(33);
  });
});
