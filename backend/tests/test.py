import unittest

class basictest(unittest.TestCase):
    """ Basic tests """

    def test_dummy(self):
        return self.assertEqual(True, True)

if __name__ == '__main__':
    unittest.main()
