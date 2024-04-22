import pandas as pd
import torch
from torch.utils.data import DataLoader
import numpy as np
# Define the MLP class
class MLP(torch.nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super(MLP, self).__init__()
        self.layers = torch.nn.Sequential(torch.nn.Linear(input_dim, hidden_dim), 
                                          torch.nn.ReLU(), 
                                          torch.nn.Dropout(),
                                          torch.nn.BatchNorm1d(hidden_dim), 
                                          torch.nn.Linear(hidden_dim, output_dim)
                                          )

    def forward(self, x):
        return self.layers(x)

# Define the dataset class
class TimeDataset(torch.utils.data.Dataset):
    def __init__(self, data):
        self.data = data

    def __getitem__(self, index):
        return self.data.iloc[index, 8].astype(np.float32), self.data.iloc[index, 7].astype(np.float32)

    def __len__(self):
        return len(self.data)

def predict(model, start_date):
  d = {'col1': [0], 'col2': [0], 'col3': [0], 'col4': [0], 'col5': [0], 'col6' : [0], 'Start Time': [start_date], 'Time' : [0]}
  df = pd.DataFrame(data=d)
  df['Start Time'] = pd.to_datetime(df['Start Time'], format='%Y-%m-%dT%H:%M:%S')
  start = pd.to_datetime('2023-01-05 11:00:00', format='%Y-%m-%d %H:%M:%S')
  df['from_start_time'] = (df['Start Time'] - start).dt.total_seconds()
  dataset = TimeDataset(df)
  dataloader = DataLoader(dataset, batch_size=1, shuffle=False)
  model.eval()
  with torch.no_grad():
    for i, (x, y) in enumerate(dataloader):
      x  = x.reshape(-1, 1)
      y_pred = model(x)
  return df['Start Time'][0] + pd.to_timedelta(y_pred.item(), unit = 's')

model = MLP(1, 16, 1)
model.load_state_dict(torch.load('model.pt'))
print(predict(model, '2023-01-05T11:00:00'))
